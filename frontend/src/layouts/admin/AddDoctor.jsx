import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import {
  useCreateStaffMutation,
  useGetSpecsQuery,
} from "../../slices/doctorsApiSlice";

function AddDoctor() {
  const { data: specs, isLoading: loadingSpecs } = useGetSpecsQuery();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialiation, setSpecialization] = useState("");
  const [sched, setSched] = useState("");
  const [password, setPassword] = useState("");

  // const ar = [];

  // const sch = doctor?.schedule?.map((s) => ar.push(s.slot));
  // const updatedSch = ar.join(",");

  const [createDoctor, { isLoading: loadingcreate }] = useCreateStaffMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const schedule = sched?.split(",").map((s) => ({ slot: s }));
    try {
      await createDoctor({
        firstName,
        lastName,
        phone,
        email,
        specialiation,
        schedule,
        password,
      });

      window.alert("Doctor is created successfully");

      navigate("/admin/doctors");
    } catch (err) {
      window.alert(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="py-3">
      <Link to="/admin/doctors">
        <Button type="button" className="btn-bg my-3" variant="dark">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Add Doctor</h1>
        {loadingSpecs && <p>Loading...</p>}
        {loadingcreate && <p>Loading...</p>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title">
            <Form.Label>firstName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter LastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="description1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="roomNumbers">
            <Form.Label>schedule</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Schedule"
              value={sched}
              onChange={(e) => setSched(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Specialiation</Form.Label>
            <Form.Control
              as="select"
              placeholder="select Specialiation"
              value={specialiation}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option>Select</option>
              {specs?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {" "}
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            style={{ marginTop: "1rem" }}
            className="btn-bg"
          >
            Add
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default AddDoctor;
