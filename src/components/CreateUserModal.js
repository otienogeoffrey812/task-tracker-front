
import React, { useState, useEffect } from 'react';
import {Form, Modal, Button } from '@themesberg/react-bootstrap';
import { faPlus} from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';


export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  var [firstName, setFirstName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [role, setRole] = React.useState("");

  //Show Form Submission Error
  const [showValidationError, setShowValidationError] = useState(true);


  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    var status = 1;
    var payload = {
      firstName, secondName, email, phone,role, status
    }

    Axios.post('http://localhost:8000/api/users',JSON.stringify(payload),
              {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res=>{
              if(res.status === 201){
                setShowValidationError(true)
                window.location.reload()
              }
            })
            .catch((error) => {
              console.log(error);
              setShowValidationError(false)
          })
  
    // setSubmitted(true);
  };

  return (
    <React.Fragment>

      <Button variant="success" className="my-3 float-right"  onClick={() => setShowDefault(true)}>
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add User
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Create New User</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            <div className="mx-1 text-danger" hidden={showValidationError}>Failed! Email is already in use!</div>
          <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control required value={firstName} onChange={(e) => setFirstName(e.target.value)}  type="text"  placeholder="First Name" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control required value={secondName} onChange={(e) => setSecondName(e.target.value)}  type="text"  placeholder="Second Name" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control required value={email} onChange={(e) => setEmail(e.target.value)}  type="email"  placeholder="Email" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control required value={phone} onChange={(e) => setPhone(e.target.value)}  type="tel" pattern="(\+254)[0-9]{9}"  placeholder="+2547..." />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select value={role} onChange={(e) => setRole(e.target.value)} required placeholder="Enter task...">
                <option defaultValue>Select Role</option>
                <option value="1">ADMIN</option>
                <option value="2">USER</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Label>Example textarea</Form.Label> */}
            <Form.Group className="justify-content-center">
              <Button variant="success" className="me-1 w-100"  type="submit">Add</Button>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            I Got It
        </Button> */}
          <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
