
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import Axios from 'axios';


export default () => {

  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [user, setUser] = useState()

  //Show Form Submission Error
  const [showValidationError, setShowValidationError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    var payload = {
      phone,password
    }

    Axios.post('http://localhost:8000/api/users/auth',JSON.stringify(payload),
              {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{
              if(res.status === 200){
                setShowValidationError(true)
                localStorage.setItem('user', JSON.stringify(res.data))
                window.location.replace(Routes.Dashboard.path);
              }
            })
            .catch((error) => {
              console.log(error);
              setShowValidationError(false)
          })
  
  };
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Phone</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required  value={phone} onChange={(e) => setPhone(e.target.value)}  type="tel" pattern="(\+254)[0-9]{9}"  placeholder="+2547..." />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Sign in
                  </Button>
                </Form>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    {/* Not registered? */}
                    <Card.Link as={Link} to={Routes.ForgotPassword.path} className="fw-bold">
                      {` Lost Password ? `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
