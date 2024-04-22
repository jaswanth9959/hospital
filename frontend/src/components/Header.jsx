import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <header>
      <Navbar expand="md" collapseOnSelect bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>Hospital</strong>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" ms-auto">
              {userInfo ? (
                userInfo.role === "admin" ? (
                  <>
                    <NavDropdown title={userInfo.firstname} id="username">
                      <LinkContainer to="/admin/appointments">
                        <NavDropdown.Item>Manage Appointments</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/doctors">
                        <NavDropdown.Item>Manage Doctors</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                    <Nav.Link onClick={logoutHandler}>Admin LogOut</Nav.Link>
                  </>
                ) : (
                  <>
                    {userInfo.role === "user" && (
                      <>
                        <LinkContainer to={`/patienthistory/${userInfo._id}`}>
                          <Nav.Link>My FeedBacks</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/myappointments">
                          <Nav.Link>My Appointments</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>{" "}
                      </>
                    )}
                    {userInfo.role === "doctor" && (
                      <>
                        <LinkContainer to="/doctorprofile">
                          <Nav.Link>My Account</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/admin/doctorappointments">
                          <Nav.Link>Manage Appointments</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={logoutHandler}>LogOut</Nav.Link>{" "}
                      </>
                    )}
                  </>
                )
              ) : (
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <FaUserAlt /> SignIn
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
