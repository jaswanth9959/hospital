import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserByIDQuery,
  useCreateFeedBackMutation,
} from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";
import { Row, Col, Form, Card, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function PatientHistory() {
  const { id: userId } = useParams();
  const { appid: appointmentId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, refetch, error } = useGetUserByIDQuery(userId);
  const [feedBack, setFeedBack] = useState("");

  const [createFeedback, { isLoading: loadingFeedback }] =
    useCreateFeedBackMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createFeedback({
        userId,
        feedBack,
        name: userInfo.firstname + " " + userInfo.lastname,
        doctorId: userInfo._id,
      }).unwrap();
      refetch();
      setFeedBack("");
      window.alert("FeedBack added successfully");
    } catch (err) {
      setFeedBack("");
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <LinkContainer to={`/appointment/${appointmentId}`}>
        <Button variant="dark">Back</Button>
      </LinkContainer>
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

          {userInfo.role === "doctor" && (
            <ListGroup>
              <ListGroup.Item>
                <h2>Write a Patient FeedBack</h2>

                {loadingFeedback && <p>Loading...</p>}

                <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="comment">
                    <Form.Label>FeedBack</Form.Label>
                    <Form.Control
                      as="textarea"
                      row="3"
                      required
                      value={feedBack}
                      onChange={(e) => setFeedBack(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingFeedback}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          )}
        </Col>
      </Row>
    </>
  );
}

export default PatientHistory;
