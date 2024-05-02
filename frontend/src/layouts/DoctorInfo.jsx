import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useGetStaffByIDQuery } from "../slices/doctorsApiSlice";
import { useState } from "react";
import { addTocart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
function DoctorInfo() {
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedSlot, setSelectedSlot] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: doctorId } = useParams();
  const { data: doctor, isLoading, error } = useGetStaffByIDQuery(doctorId);
  const dates = JSON.parse(localStorage.getItem("dates"));
  const apponitmentDate = new Date(dates).toLocaleDateString("en-US");

  const check2 = () => {
    const t = userInfo.appointments.map((app) =>
      app.atype === doctor?.specialization?.name &&
      apponitmentDate === new Date(app.date).toLocaleDateString("en-US")
        ? app.slot
        : false
    );
    return t[0];
  };

  const dup = check2();

  const check = (slot) => {
    const t = userInfo.appointments.map(
      (app) =>
        app.slot === slot.slot &&
        (apponitmentDate === new Date(app.date).toLocaleDateString("en-US")
          ? true
          : false)
    );
    return t[0];
  };

  const isAvailable = (slot) => {
    const isFound = slot.unavailableDates.some((date) =>
      apponitmentDate.includes(new Date(date).toLocaleDateString("en-US"))
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedSlot(
      checked
        ? [...selectedSlot, value]
        : selectedSlot.filter((item) => item !== value)
    );
  };

  const handleClick = () => {
    const slot = doctor.schedule.filter(
      (slot) => slot._id === selectedSlot?.join(" ")
    );

    dispatch(
      addTocart({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        doctor: doctor._id,
        specialization: doctor.specialization.name,
        slot_id: selectedSlot[0],
        apponitmentDate,
        dates,
        slot: slot[0].slot,
      })
    );
    navigate("/confirm");
  };
  return (
    <div>
      <LinkContainer to="/doctors">
        <Button variant="dark">Back</Button>
      </LinkContainer>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error?.data?.message || error.error}</p>
      ) : (
        <>
          <Row>
            <h4 className="text-center my-4">
              Appointment Date: {apponitmentDate}
            </h4>
            <Col md={{ span: 6, offset: 3 }}>
              <Card className="p-2">
                <Card.Title className="p-3">
                  <h1>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h1>
                </Card.Title>
                <Card.Body>
                  <Card.Text>
                    <h2>Specialization: {doctor.specialization.name}</h2>
                  </Card.Text>
                </Card.Body>

                {dup ? (
                  `You Already Have Appointment with ${doctor.specialization.name} on ${apponitmentDate} at ${dup}`
                ) : (
                  <>
                    <Card.Body className="my-3">
                      <Col className="py-3">
                        <strong>Select Time Slot For Appointment:</strong>
                      </Col>
                      <Col className="py-3">
                        <div className="rSelectRooms">
                          {doctor.schedule.map((slot) => (
                            <div className="room" key={slot.slot}>
                              <input
                                style={{ width: "20px", height: "20px" }}
                                type="checkbox"
                                value={slot._id}
                                onChange={handleSelect}
                                disabled={!isAvailable(slot) || check(slot)}
                              />
                              <label>{slot.slot} </label>
                              <p>
                                <strong>
                                  {" "}
                                  {/* {isAvailable(slot)
                                ? "(Available)"
                                : "(Not Available)"} */}
                                  {check(slot) ? (
                                    <p>
                                      "You Already another appointment during
                                      this time"
                                    </p>
                                  ) : isAvailable(slot) ? (
                                    "(Available)"
                                  ) : (
                                    "(Not Available)"
                                  )}
                                </strong>
                              </p>
                            </div>
                          ))}
                        </div>
                      </Col>
                    </Card.Body>
                    <Card.Body>
                      <Button variant="dark" onClick={handleClick}>
                        Confirm
                      </Button>
                    </Card.Body>
                  </>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
export default DoctorInfo;
