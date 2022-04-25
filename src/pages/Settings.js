import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Form, Button} from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";

import Profile3 from "../assets/img/pic-1.jpg";
import { Routes } from "../routes";
import { Link } from 'react-router-dom';


export default () => {
  const [user, setUser] = useState()

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

  if (!user ) return null;

  return (
    <>
      <Row class="mt-5">
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-4">General information</h5>
              <Form>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control required type="text" value={user.firstName} placeholder="first name" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control required value={user.secondName} type="text" placeholder="last name" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="align-items-center">
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control required value={user.email} readOnly type="email" placeholder="email" />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="phone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control required value={user.phone} readOnly type="tel" placeholder="phone" />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-3">
                  <Button variant="primary" type="submit">Update</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Col xs={24} xl={4}>
          <Row>
            <Col xs={12}>
              {/* <ProfileCardWidget /> */}
              {/* Change Password */}
              <Card xs={12} border="light" className="bg-white shadow-sm">
                <Card.Body>
                  <Button variant="primary" className="w-100" type="submit" as={Link} to={Routes.ResetPassword.path}>Change Password</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
