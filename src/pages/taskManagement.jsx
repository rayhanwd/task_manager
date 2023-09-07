import React from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import TodoTable from "../components/todoTable/todoTable";

const TaskManagement = () => {
  return (
    <DashboardLayout>
      <TodoTable/>
    </DashboardLayout>
  );
};

export default TaskManagement;
