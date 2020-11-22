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
        <button onClick={() => onPanelClicked("add-category")}>
          Add Category
        </button>
        <button onClick={() => onPanelClicked("create-test")}>
          Create Test
        </button>
        <button onClick={() => onPanelClicked("users")}>Users</button>
        <button onClick={() => onPanelClicked("reports")}>Reports</button>
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
