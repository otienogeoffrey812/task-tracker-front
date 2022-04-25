
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import Axios from 'axios';

export default () => {

  const [task, setTask] = React.useState(null);
  const [user, setUser] = useState(null)

  var [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

  const [showValidationError, setShowValidationError] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);

    }
    else{
      window.location.replace("http://localhost:3000/#/auth/sign-in");
    }
  }, []);

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    var payload = {
      oldPassword, newPassword, confirmNewPassword
    }

    Axios.put(`http://localhost:8000/api/users/reset/${user.id}`,payload)
        .then(res=>{
          if(res.status === 200){
            setShowValidationError(true)
            window.location.replace(Routes.Dashboard.path)
          }
        })
        .catch((error) => {
          console.log(error);
          setShowValidationError(false)
      })
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link>
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Reset password</h3>
                <Form onSubmit={handleSubmit}>
                {/* <div className="mx-1 text-danger" hidden={showValidationError}>New Password and confirm new password must be the same!</div> */}
                  {/* <Form.Group id="oldPassword" className="mb-4">
                    <Form.Label>Current Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} autoFocus required type="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group id="newPassword" className="mb-4">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required type="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirmNewPassword" className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required type="password" placeholder="Confirm Password" />
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Reset password
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
