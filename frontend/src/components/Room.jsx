import { Col, Row, ListGroup, Image, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Room({ room, available }) {
  let occupied = available(room);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/room/${room._id}`);
  };
  return (
    <ListGroup>
      <ListGroup.Item>
        <Row>
          <Col md={6}>
            <Image src={`http://localhost:5000${room.image}`} fluid />
          </Col>
          <Col md={6}>
            <h1>{room.title}</h1>

            <p>
              Accomodates upto <strong>{room.maxpeople}</strong> people.
            </p>
            <p>
              Category: <strong>{room.roomType.name}</strong>
            </p>
            <p>
              Price: <strong>${room.price} per Night</strong>
            </p>

            <div>
              <Row>
                <Col>
                  {occupied ? (
                    <Badge bg="success">
                      <h6>Available</h6>
                    </Badge>
                  ) : (
                    <Badge bg="warning">
                      <h6>Occupied</h6>
                    </Badge>
                  )}
                </Col>
                {occupied && (
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="dark"
                        disabled={!available(room)}
                        onClick={clickHandler}
                      >
                        View
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Room;
