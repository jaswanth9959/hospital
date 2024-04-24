import React, { useState } from "react";
import { useGetStaffQuery, useGetSpecsQuery } from "../slices/doctorsApiSlice";
import { Row, Col, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Doctor from "../components/Doctor";
function Doctors() {
  const { data: doctors, isLoading, error } = useGetStaffQuery();
  const { data: specs, isLoading: loading, error: err } = useGetSpecsQuery();

  const [filterBy, setFilterBy] = useState("Neurologist");
  let filteredItems;
  if (filterBy === "all") filteredItems = doctors;
  else {
    filteredItems = doctors?.filter((x) => x.specialization.name === filterBy);
  }
  return (
    <>
      {isLoading ? (
        <h1>.....</h1>
      ) : error ? (
        <h2>{error?.data?.message || error?.error}</h2>
      ) : (
        <>
          <LinkContainer to="/">
            <Button variant="dark">Back</Button>
          </LinkContainer>
          <h1 className="text-center">Doctors</h1>
          {loading ? (
            <p>loading...</p>
          ) : err ? (
            <p>{error?.message?.data || error?.error}</p>
          ) : (
            <Row className="mt-4 mb-4 justify-content-md-center">
              <Col md={8}>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      <strong>Specialization:</strong>
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="select"
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value)}
                      >
                        {specs?.map((x) => (
                          <option key={x._id} value={x.name}>
                            {x.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
          <Row>
            {filteredItems.map((d) => (
              <Col key={d._id} xs={6} md={4} lg={3} className="mb-4">
                <Doctor doctor={d} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

export default Doctors;
