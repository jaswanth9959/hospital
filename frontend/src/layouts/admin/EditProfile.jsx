import { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useStaffprofileMutation } from "../../slices/doctorsApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Link } from "react-router-dom";
function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useStaffprofileMutation();

  useEffect(() => {
    setFirstName(userInfo.firstname);
    setLastName(userInfo.lastname);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, [userInfo.email, userInfo.firstname, userInfo.lastname, userInfo.phone]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          doctorId: userInfo._id,
          firstname: firstName,
          lastname: lastName,
          email,
          phone,
          password,
          token: userInfo.token,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        window.alert("Profile updated successfully");
      } catch (err) {
        window.alert(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container className="py-3">
      <Link to="/">
        <Button type="button" className="btn-bg my-3" variant="dark">
          Go Back
        </Button>
      </Link>
      <>
        <h1>Edit Profile</h1>
        {loadingUpdateProfile && <p>Loading...</p>}

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

          <Form.Group controlId="price2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="price4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            style={{ marginTop: "1rem" }}
            className="btn-bg"
          >
            Update
          </Button>
        </Form>
      </>
    </Container>
  );
}

export default EditProfile;
