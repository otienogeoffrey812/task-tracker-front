
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Pagination} from '@themesberg/react-bootstrap';
// import $ from "jQuery";

import Modals from "./ViewTaskModal";


export const AllTaskTable = () => {

  const [task, setTask] = React.useState(null);
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);

      Axios.get(`http://localhost:8000/api/tasks/${foundUser.id}`).then((response) => {
      setTask(response.data);
    });
    }
    else{
      // window.location.replace("http://localhost:3000/#/auth/sign-in");
    }
  }, []);

  if (!task || !user) return null;

  // alert("ID: "+id)

  const show = (e) => {
    e.preventDefault();
    var rowId = 
        e.target.parentNode.parentNode.parentNode.id;

    // alert("TEST: "+rowId)
}

  const totalTransactions = 8;

  const TableRow = (props) => {
    const { id, task, createdById, user, customer,category, issuedDate, dueDate, status} = props;
    const statusVariant = status == "1" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (
      <tr id={id}>
        <td>
          <span className="fw-normal classId">
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {task.length > 20 ? task.substring(0, 20)+"...": task}
          </span>
        </td>
        {/* <td>
          <span className="fw-normal">
            {createdById}
          </span>
        </td> */}
        <td>
          <span className="fw-normal">
            {user.firstName +" "+user.secondName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {customer.name}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {category.categoryName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issuedDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {dueDate}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`} >
            {status == 1 ? "New": "Cancelled"}
          </span>
        </td>
        <td>
            {/* <span className="fw-normal" > */}
              {/* <span className="text-success"><FontAwesomeIcon icon={faEye} className="me-3" /></span>*/}
              <Modals/>
              <span className="text-primary" onClick={show}><FontAwesomeIcon icon={faEdit} className="me-3" /></span>            
              <span className="text-danger"><FontAwesomeIcon icon={faTrashAlt} className="me-3" /></span>
            {/* </span> */}
        </td>
      </tr>
    );
  };

  return (
    <div>

  {/* <Modals/> */}
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table id="indexedTable" hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#ID</th>
              <th className="border-bottom">Task</th>
              {/* <th className="border-bottom">Created By</th> */}
              <th className="border-bottom">Assigned To</th>
              <th className="border-bottom">Customer</th>
              <th className="border-bottom">category</th>
              <th className="border-bottom">Issued</th>
              <th className="border-bottom">Due</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {task.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          {/* <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small> */}
        </Card.Footer>
      </Card.Body>
    </Card>
    </div>
  );
};