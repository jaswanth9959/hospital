import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className=" py-4 bg-dark text-light">
      <Container>
        <Row className="text-center">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Hospital Management System</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
