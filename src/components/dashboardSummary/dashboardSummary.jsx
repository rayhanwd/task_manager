import React, { useEffect, useState } from "react";
import { getCurrentDate } from "../../utils";

const DashboardSummary = () => {
  
  const [summaryData, setSummaryData] = useState({
    totalTasksCreated: 0,
    totalTodoProgress: 0,
    totalRevised: 0,
    totalComplete: 0,
    todayTasksCount:0
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const currentDate = getCurrentDate();

    if (tasks) {
      const totalTasksCreated = tasks.length;
      const totalTodoProgress = tasks.filter(
        (t) => t.label === "TO DO LIST"
      ).length;
      const totalRevised = tasks.filter((t) => t.label === "REVISED").length;
      const totalComplete = tasks.filter((t) => t.label === "COMPLETED").length;
      const todayTasks = tasks.filter((t) => t.due_date === currentDate);

      const summaryData = {
        totalTasksCreated,
        totalTodoProgress,
        totalRevised,
        totalComplete,
        todayTasksCount: todayTasks.length,
      };

      setSummaryData(summaryData);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-600 p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2 text-white">Total Tasks Created</p>
          <p className="text-3xl text-white">{summaryData.totalTasksCreated}</p>
        </div>
        <div className="bg-yellow-600 p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2 text-white">Total Todo Progress</p>
          <p className="text-3xl text-white">{summaryData.totalTodoProgress}</p>
        </div>
        <div className="bg-blue-600 p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2 text-white">Total Revised</p>
          <p className="text-3xl text-white">{summaryData.totalRevised}</p>
        </div>
        <div className="bg-purple-600 p-4 rounded-lg shadow-md">
          <p className="text-xl font-bold mb-2 text-white">Total Complete</p>
          <p className="text-3xl text-white">{summaryData.totalComplete}</p>
        </div>
        <div className="p-4 bg-orange-500 rounded-lg shadow-md">
          <p className="text-xl font-bold text-white">Today's Tasks</p>
          <p className="text-3xl text-white">{summaryData.todayTasksCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
