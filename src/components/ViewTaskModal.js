
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from '@themesberg/react-bootstrap';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import moment from "moment-timezone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import ReactDOM from 'react-dom';


export default () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);

  var [dueDate, setDueDate] = React.useState("");
  const [assignedTo, setAssignedTo] = React.useState("");
  const [taskCategory, setTaskCategory] = React.useState("");
  const [customer, setCustomer] = React.useState("");
  const [task, setTask] = React.useState("");
  const [loggedInUser, setloggedInUser] = useState()

  const [users, setUsers] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [customers, setCustomers] = React.useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setloggedInUser(foundUser);
    }
    else{
      // window.location.replace(Routes.Signin.path);
    }
  }, []);


  React.useEffect(() => {
    Axios.get('http://localhost:8000/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  React.useEffect(() => {
    Axios.get('http://localhost:8000/api/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);

  React.useEffect(() => {
    Axios.get('http://localhost:8000/api/customers').then((response) => {
      setCustomers(response.data);
    });
  }, []);

  if (!users || !categories || !customers || !loggedInUser) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    var status = 1;
    var issuedDate = moment().format("YYYY-MM-DD HH:mm");
    var createdBy = loggedInUser.id
    dueDate = moment(dueDate).format("YYYY-MM-DD HH:mm") 
    var payload = {
      task,createdBy,customer,taskCategory, assignedTo,issuedDate,dueDate,status
    }
   
    Axios.post('http://localhost:8000/api/tasks',payload)
            .then(res=>{
                console.log(res);
                window.location.reload()
            });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();

    setShowDefault(true)

    var rowId = e.target.parentNode.parentNode.parentNode.id;

    // alert("Open: "+ rowId);
  };

  return (
    <React.Fragment>

      {/* <Button variant="success" className="my-3 float-right"  onClick={() => setShowDefault(true)}>
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add Task
      </Button> */}

      <span className="text-success"><FontAwesomeIcon icon={faEye} className="me-3" onClick={handleOpenModal} /></span>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Task #</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>

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
