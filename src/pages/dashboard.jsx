import React from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import DashboardSummary from "../components/dashboardSummary/dashboardSummary";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardSummary/>
    </DashboardLayout>
  );
}

export default Dashboard;
