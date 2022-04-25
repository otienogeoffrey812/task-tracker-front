
import React, { useState, useEffect } from 'react';
import { faCashRegister, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { Col, Row} from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget } from "../components/Widgets";
// import { trafficShares} from "../data/charts";
import {TasksTable} from "../components/DashboardTable";

import { Routes } from "../routes";

export default () => {
  const [user, setUser] = useState()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
    else{
      window.location.replace(Routes.Signin.path);
    }
  }, []);

  return (
    <>
    <div>
      {/* <Row className="justify-content-md-center mt-5">
        
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="New Tasks"
            title="86"
            period="Feb 1 - Apr 1"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Over Due Tasks"
            title="17"
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Summary"
            data={trafficShares} />
        </Col>
      </Row> */}

      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h4>Tasks</h4>
          <p className="mb-0">
          </p>
        </div>
      </div>
      <TasksTable />
      </div>      
    </>
  );
};
