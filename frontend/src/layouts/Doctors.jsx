import React from "react";
import { useGetStaffQuery } from "../slices/doctorsApiSlice";
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Doctor from "../components/Doctor";
function Doctors() {
  const { data: doctors, isLoading, error } = useGetStaffQuery();
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
          <Row>
            {doctors.map((d) => (
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
