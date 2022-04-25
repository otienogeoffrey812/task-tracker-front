
import React, { useState, useEffect } from 'react';
import { Form, Modal, Button } from '@themesberg/react-bootstrap';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

import moment from "moment-timezone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';


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

  return (
    <React.Fragment>

      <Button variant="success" className="my-3 float-right"  onClick={() => setShowDefault(true)}>
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Add Task
      </Button>

      <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title className="h6">Create New Task</Modal.Title>
          <Button variant="close" aria-label="Close" onClick={handleClose} />
        </Modal.Header>
        <Modal.Body>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required >
                <option defaultValue>Select User</option>
                  {users.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.firstName +" "+item.secondName}
                    </option>
                  ))}

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select value={taskCategory} onChange={(e) => setTaskCategory(e.target.value)} required >
                <option defaultValue>Select category</option>
                  {categories.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.categoryName}
                    </option>
                  ))}

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select value={customer} onChange={(e) => setCustomer(e.target.value)} required >
                <option defaultValue>Select customer</option>
                  {customers.map(item => (
                    <option
                      key={item.id}
                      value={item.id}
                    >
                      {item.name}
                    </option>
                  ))}

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control required value={dueDate} onChange={(e) => setDueDate(e.target.value)}  type="datetime-local" min={moment().format("YYYY-MM-DDTHH:mm")} defaultValue="Mark" />
              <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Control as="textarea" rows="5"  value={task} onChange={(e) => setTask(e.target.value)} required placeholder="Enter task..." />
            </Form.Group>

            <Form.Group className="justify-content-center">
              <Button variant="success"  className="me-1 w-100"  type="submit">Add</Button>
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
