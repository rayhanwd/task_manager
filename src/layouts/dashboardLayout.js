import React, { useState } from "react";
import Sidebar from "../components/sidebar/sidebar";
import TopHeader from "../components/topheader/topHeader";
import { FaBars } from "../icons";

const DashboardLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          sidebarVisible ? "block" : "hidden"
        } bg-gray-800 text-white w-64 py-4 px-6 fixed top-0 left-0 h-screen z-50 transition-all duration-300`}
      >
        <Sidebar />
      </div>
      <div
        className={`flex-1 ${
          sidebarVisible ? "ml-64" : "ml-0"
        } p-8 transition-all duration-300`}
      >
        <div className="fixed top-0 left-0 w-full z-10">
          <TopHeader />

        </div>
        <div className="mt-16">{children}</div>
        <button
            className="fixed top-4 left-26 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none z-40"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
      </div>
    </div>
  );
};

export default DashboardLayout;
