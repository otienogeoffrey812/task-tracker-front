
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {  faEdit, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Nav, Card, Table, Pagination } from '@themesberg/react-bootstrap';

import Modals from "./CreateUserModal";


export const UsersTable = () => {

    
  const [user, setUser] = useState()
  const [post, setPost] = React.useState(null);
  const [showDefault, setShowDefault] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setShowDefault(foundUser.role == 1 ? false : true)
    }
    else{
      window.location.replace("http://localhost:3000/#/auth/sign-in");
    }
  }, []);

  React.useEffect(() => {
    Axios.get('http://localhost:8000/api/users').then((response) => {
      setPost(response.data);
    });
  }, []);


  if (!post || !user) return null;

  const totalTransactions = 8;

  const TableRow = (props) => {
    const { firstName, secondName, email, phone,role, status } = props;
    const statusVariant = status == "1" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";
    // const roleVariant = role == "1" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";


    return (
      <tr>
        <td>
          <span className="fw-normal">
            {firstName + " "+ secondName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {email}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {phone}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {status == 1 ? "ADMIN": "USER"}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status == 1 ? "Active": "Cancelled"}
          </span>
        </td>
        <td>
            <span className="fw-normal">
              <span className="text-success"><FontAwesomeIcon icon={faEye} className="me-3" /></span>          
              <span className="text-primary"><FontAwesomeIcon icon={faEdit} className="me-3" /></span>            
              <span className="text-danger"><FontAwesomeIcon icon={faTrashAlt} className="me-3" /></span>
            </span>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <div hidden={showDefault}><Modals/></div> 
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Name</th>
              <th className="border-bottom">email</th>
              <th className="border-bottom">Phone</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Status</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {post.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
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