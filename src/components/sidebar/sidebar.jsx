import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-lg pt-5">Task Manager</h2>
      <ul>
        <li className="mt-5">
          <NavLink className="text-lg pl-5" to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li className="mt-5">
          <NavLink className="text-lg pl-5" to="/dashboard/task_management">
            Task Management
          </NavLink>
        </li>
        <li className="mt-5">
          <NavLink className="text-lg pl-5" to="/dashboard/team_management">
            Team Management
          </NavLink>
        </li>
        <li className="mt-5">
          <NavLink className="text-lg pl-5" to="/dashboard/setting">
            Account setting
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
