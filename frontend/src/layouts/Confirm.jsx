import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Confirm() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    navigate("/signin?redirect=/details");
  };
  return (
    <Container className="py-3">
      <LinkContainer to={`/doctor/${cartItems.doctor}`}>
        <Button variant="dark">Back</Button>
      </LinkContainer>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <h1 style={{ margin: "20px 0px" }}>Comfirm Appointment</h1>
          {cartItems.length === 0 ? (
            <div className="my-3 text-center">
              <p>
                There are no Appointments. <Link to="/">Go Back</Link>
              </p>
            </div>
          ) : (
            <ListGroup className="text-center">
              <ListGroup.Item style={{ height: "120px" }}>
                <Row className="mt-4">
                  <Col md={3}>
                    Doctor:{" "}
                    <strong>
                      Dr {cartItems.firstName} {cartItems.lastName}
                    </strong>
                  </Col>
                  <Col md={3}>
                    Appointment Date :
                    <strong>{cartItems.apponitmentDate}</strong>
                  </Col>
                  <Col>
                    {" "}
                    Appointment Time: <strong>{cartItems.slot}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col
          className="d-flex justify-content-end"
          md={{ span: 10, offset: 1 }}
        >
          <Button variant="dark" className="mt-3 " onClick={checkoutHandler}>
            Confirm
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
export default Confirm;
