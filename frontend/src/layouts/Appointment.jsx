import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Container, Badge, Button } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  useGetClientIDQuery,
  usePayAppointmentMutation,
  useGetAppointmentByIdQuery,
  useUpdateStatusMutation,
  useCancelAppointmentMutation,
} from "../slices/appointmentsApiSlice";
import { setCredentials } from "../slices/authSlice";
function Appointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: appointmentId } = useParams();
  const {
    data: appointment,
    isLoading,
    refetch,
  } = useGetAppointmentByIdQuery(appointmentId);
  const { userInfo } = useSelector((state) => state.auth);
  const [payAppointment, { isLoading: loadingPay }] =
    usePayAppointmentMutation();
  const [updateStatus, { isLoading: loadingUpdate }] =
    useUpdateStatusMutation();
  const [cancelAppointment, { isLoading: loadingCancel }] =
    useCancelAppointmentMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetClientIDQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (appointment && !appointment?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [appointment, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApproveTest() {
    payAppointment({ appointmentId, details: { payer: {} } });
    refetch();
    window.alert("payment successful");
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        const res = await payAppointment({ appointmentId, details }).unwrap();
        dispatch(setCredentials({ ...res.updateduser }));
        refetch();
        window.alert("payment successful");
      } catch (err) {
        window.alert(err?.data?.message || err.message);
      }
    });
  }
  function onError(err) {
    window.alert(err?.data?.message || err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: appointment.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  const handleClick = async () => {
    await updateStatus(appointmentId);
    refetch();
  };

  const handleCancel = async () => {
    await cancelAppointment({ appointmentId });
    window.alert("Appointment is Canceled");
    refetch();
  };

  const viewPatient = () => {
    navigate(`/patienthistory/${appointment.user._id}/${appointment._id}`);
  };
  return (
    <Container className="py-3">
      {userInfo.role === "user" && (
        <LinkContainer to="/myappointments">
          <Button variant="dark">Back</Button>
        </LinkContainer>
      )}
      {userInfo.role === "admin" && (
        <LinkContainer to="/admin/appointments">
          <Button variant="dark">Back</Button>
        </LinkContainer>
      )}
      {userInfo.role === "doctor" && (
        <LinkContainer to="/admin/doctorappointments">
          <Button variant="dark">Back</Button>
        </LinkContainer>
      )}
      <Row>
        {isLoading ? (
          <p>Loading..</p>
        ) : (
          <>
            <h1 style={{ margin: "20px 0px" }}>
              Appointment ID: {appointment?._id}
            </h1>
            <Col md={{ span: 8 }}>
              <Card className="p-3">
                <Card.Text>
                  Patient Name:{" "}
                  <strong>
                    {appointment.user.firstName} {appointment.user.lastName}
                  </strong>
                </Card.Text>

                <Card.Text>
                  Doctor:{" "}
                  <strong>
                    Dr {appointment.doctor.firstName}{" "}
                    {appointment.doctor.lastName}
                  </strong>
                </Card.Text>
                <Card.Text>
                  Appointment Date :
                  <strong>{appointment.details.appointmentDate}</strong>
                </Card.Text>
                <Card.Text>
                  {" "}
                  Appointment Time:{" "}
                  <strong>{appointment.details.appointmentTime}</strong>
                </Card.Text>
                <Card.Text>
                  Status:
                  <strong>{appointment.Status}</strong>
                </Card.Text>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="p-3">
                <Card.Title style={{ fontSize: "24px" }}>
                  Fee Details
                </Card.Title>
                <Card.Text className="mt-2">
                  Consulting Fee: <strong>${appointment.Price}</strong>
                </Card.Text>
                <Card.Text className="mt-2">
                  Tax: <strong>${appointment.taxPrice}</strong>
                </Card.Text>
                <Card.Text className="mt-2">
                  Total: <strong>${appointment.totalPrice}</strong>
                </Card.Text>
                <Card.Text>
                  Payment Status:{" "}
                  {appointment.isPaid ? (
                    <Badge bg="success">
                      <span className="pt-1">
                        {"Paid On "}
                        {new Date(appointment.paidAt).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </Badge>
                  ) : (
                    <Badge bg="danger">
                      <h6 className="pt-1">Pending</h6>
                    </Badge>
                  )}
                </Card.Text>
                <Row>
                  <Col
                    className="d-flex justify-content-end"
                    md={{ span: 8, offset: 2 }}
                  >
                    {!appointment?.isPaid && (
                      <div>
                        {loadingPay && <p>Loading...</p>}
                        {isPending ? (
                          <p>Loading...</p>
                        ) : (
                          <div>
                            <div>
                              <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                onError={onError}
                              ></PayPalButtons>
                            </div>
                            <Button onClick={onApproveTest}>Pay</Button>
                          </div>
                        )}
                      </div>
                    )}
                    {isLoading && <p>Loadng</p>}
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {appointment?.Status === "Paid" && (
        <Button onClick={handleCancel} variant="danger" className="mx-2">
          Cancel Appointment
        </Button>
      )}
      {loadingCancel && <p>Loading..</p>}
      {userInfo.role === "doctor" && appointment?.Status === "Paid" && (
        <>
          <Button onClick={handleClick}>Mark as Visited</Button>
          <Button variant="success" className="mx-2" onClick={viewPatient}>
            {" "}
            View Patient History
          </Button>
        </>
      )}
      {loadingUpdate && <p>Loading..</p>}
    </Container>
  );
}
export default Appointment;
