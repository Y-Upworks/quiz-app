import React, { useState } from "react";

import AddCategory from "../AddCategory/AddCategory";
import CreateTest from "../CreateTest/CreateTest";
import Users from "../Users/Users";
import Reports from "../Reports/Reports";

import "./AdminPanel.scss";

const AdminPanel = () => {
  const [currentPanel, setCurrentPanel] = useState("users");

  const onPanelClicked = (panel) => {
    setCurrentPanel(panel);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__actions">
        <button
          className="btn waves-effect waves-light #64b5f6 red darken-1"
          onClick={() => onPanelClicked("add-category")}
        >
          Add Category
        </button>
        <button
          className="btn waves-effect waves-light #64b5f6 green darken-1"
          onClick={() => onPanelClicked("create-test")}
        >
          Create Test
        </button>
        <button
          className="btn waves-effect waves-light #64b5f6 yellow darken-1"
          onClick={() => onPanelClicked("users")}
        >
          Users
        </button>
        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => onPanelClicked("reports")}
        >
          Reports
        </button>
      </div>
      <div className="admin-panel__content">
        {currentPanel === "add-category" && <AddCategory />}
        {currentPanel === "create-test" && <CreateTest />}
        {currentPanel === "users" && <Users />}
        {currentPanel === "reports" && <Reports />}
      </div>
    </div>
  );
};

export default AdminPanel;
