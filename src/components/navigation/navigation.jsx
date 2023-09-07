import React from "react";
import { AiOutlineArrowRight } from "../../icons/index";
import { BiTask } from "../../icons/index";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <BiTask className="text-indigo-600 text-4xl" />
          <span className="ml-3 text-xl">Task Manager</span>
        </Link>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink to="/" className="mr-5 hover:text-gray-900">
            Home
          </NavLink>
          <NavLink to="/" className="mr-5 hover:text-gray-900">
            About
          </NavLink>
          <NavLink to="/" className="mr-5 hover:text-gray-900">
            Contact
          </NavLink>
          <NavLink to="/" className="mr-5 hover:text-gray-900">
            Career
          </NavLink>
        </nav>
        <button
          onClick={() => navigate("/authentication")}
          className="inline-flex items-center text-white bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
        >
          Get started
        <AiOutlineArrowRight className="ml-3"/>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
