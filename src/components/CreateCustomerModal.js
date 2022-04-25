
import React, { useState, useEffect } from 'react';
import {Form, Modal, Button } from '@themesberg/react-bootstrap';
import { faPlus} from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';


export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  var [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  //Show Form Submission Error
  const [showValidationError, setShowValidationError] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    var status = 1;
    var payload = {
      name, email, phone, status
    }

    Axios.post('http://localhost:8000/api/customers',JSON.stringify(payload),
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
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add Customer
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Create New Csutomer</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            {/* <div className="mx-1 text-danger" hidden={showValidationError}>Failed! Email is already in use!</div> */}
          <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control required value={name} onChange={(e) => setName(e.target.value)}  type="text"  placeholder="Customer Name" />
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

            {/* <Form.Label>Example textarea</Form.Label> */}
            <Form.Group className="justify-content-center">
              <Button variant="success" className="me-1 w-100"  type="submit">Add</Button>
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
