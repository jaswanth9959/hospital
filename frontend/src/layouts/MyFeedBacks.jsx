import React from "react";
import { useGetUserByIDQuery } from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
function MyFeedBacks() {
  const { id: userId } = useParams();
  const { data: user, isLoading, error } = useGetUserByIDQuery(userId);

  return (
    <>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error?.data?.message || error.error}</p>
          ) : (
            <Card className="p-3">
              <Card.Title>
                <strong>Details:</strong>{" "}
              </Card.Title>
              <Card.Body>
                <Card.Text>
                  Name: {user.firstName} {user.lastName}
                </Card.Text>
                <Card.Text>Email: {user.email}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="review">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>FeedBacks</h2>
          {user?.feedBack?.length === 0 && <p>No Feedbacks</p>}
          {user?.feedBack && (
            <ListGroup variant="flush">
              {user?.feedBack?.map((fb) => (
                <ListGroup.Item key={fb._id}>
                  <strong>{fb.name}</strong>
                  <p>{fb.createdAt.substring(0, 10)}</p>
                  <p>{fb.feedBack}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  );
}

export default MyFeedBacks;
