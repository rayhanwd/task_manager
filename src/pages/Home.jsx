import React, { useEffect } from "react";
import MainLayout from "../layouts/mainLayout";
import { Link } from "react-router-dom";
import ServiceInfo from "../components/servicesInfo/serviceInfo";
import Hero from "../components/hero/hero";

const Home = () => {
  useEffect(() => {
    const userList = JSON.parse(localStorage.getItem("userList"));
    const currUser = JSON.parse(localStorage.getItem("currUser"));
    const task = JSON.parse(localStorage.getItem("task"));
    const teamName = localStorage.getItem("teamName");
    const taskTeams = JSON.parse(localStorage.getItem("taskTeams"));


    if (!userList?.length || userList?.length === 0) {
      JSON.stringify(localStorage.setItem("userList", "[]"));
    }
    if (!currUser || Object.keys(currUser).length === 0) {
      localStorage.setItem("currUser", JSON.stringify({}));
    }
    if (!task?.length || task?.length === 0) {
      JSON.stringify(localStorage.setItem("task", "[]"));
    }
    if (!taskTeams?.length || taskTeams?.length === 0) {
      JSON.stringify(localStorage.setItem("taskTeams", "[]"));
    }
    if (!teamName) {
      JSON.stringify(localStorage.setItem("teamName", ""));
    }
  }, []);

  return (
    <MainLayout>
      <Hero/>
      <ServiceInfo/>
    </MainLayout>
  );
};

export default Home;
