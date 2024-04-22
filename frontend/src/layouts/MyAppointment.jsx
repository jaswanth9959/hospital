import React from "react";
import { Link } from "react-router-dom";
import { Table, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useGetMyAppointmentsQuery } from "../slices/appointmentsApiSlice";
function MyAppointments() {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: appointments,
    isLoading,
    error,
  } = useGetMyAppointmentsQuery(userInfo._id);
  return (
    <Row>
      <Col md={{ span: 10, offset: 1 }} className="text-center my-3">
        <h1 className="my-3">My Appointmentss</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th> Doctor Name</th>
              <th>Appointment Status</th>
              <th>Payment Status</th>
              <th></th>
            </tr>
          </thead>

          {isLoading ? (
            <span>Loading...</span>
          ) : error ? (
            <span>{error?.data?.message || error.error}</span>
          ) : (
            <tbody>
              {appointments.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.details.appointmentDate}</td>
                  <td>
                    {item.doctor.firstName} {item.doctor.lastName}
                  </td>
                  <td>
                    {item.Status === "Canceled" && (
                      <strong style={{ color: "red" }}>Canceled</strong>
                    )}{" "}
                    {item.Status === "Completed" && (
                      <strong style={{ color: "green" }}>Completed</strong>
                    )}{" "}
                    {item.Status === "Pending" && (
                      <strong style={{ color: "blue" }}>Pending</strong>
                    )}
                    {item.Status === "Paid" && (
                      <strong style={{ color: "green" }}>Pending</strong>
                    )}
                  </td>
                  <td>
                    {!item.isPaid ? (
                      <strong style={{ color: "red" }}>Pending</strong>
                    ) : (
                      <strong style={{ color: "green" }}>
                        Paid On{" "}
                        {new Date(item.paidAt).toLocaleDateString("en-US")}
                      </strong>
                    )}
                  </td>
                  <td>
                    <Link to={`/appointment/${item._id}`}>
                      <Button variant="dark">View Details</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </Col>
    </Row>
  );
}

export default MyAppointments;
