
import React from "react";


import {AllTaskTable} from "../components/MyTasksTable";


export default () => {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <h4>My Tasks</h4>
          <p className="mb-0">
          </p>
        </div>
      </div>

      <AllTaskTable />
    </>
  );
};
