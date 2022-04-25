
import React, { useState, useEffect } from 'react';
import {Form, Modal, Button } from '@themesberg/react-bootstrap';
import { faPlus} from '@fortawesome/free-solid-svg-icons';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';


export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  var [categoryName, setCategoryName] = React.useState("");

  //Show Form Submission Error
  const [showValidationError, setShowValidationError] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();

    var status = 1;
    var payload = {
      categoryName, status
    }

    Axios.post('http://localhost:8000/api/categories',JSON.stringify(payload),
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
  
  };

  return (
    <React.Fragment>

      <Button variant="success" className="my-3 float-right"  onClick={() => setShowDefault(true)}>
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add Task Category
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Create New User</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>
            {/* <div className="mx-1 text-danger" hidden={showValidationError}>Category Name already exists!</div> */}
          <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control required value={categoryName} onChange={(e) => setCategoryName(e.target.value)}  type="text"  placeholder="First Name" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>

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
