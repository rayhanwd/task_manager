import React from "react";
import {
  BiTask,
  AiFillGithub,
  AiFillLinkedin,
  AiFillYoutube,
} from "../../icons/index";

import { Link } from "react-router-dom";

const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();


  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link
          to="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
        >
          <BiTask className="text-indigo-600 text-4xl" />
          <span className="ml-3 text-xl">Task Manager</span>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © {year} Task Manager —
          <a
            href="https://github.com/rayhanwd"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @rayhanjs
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start items-center">
          <a className="mx-3" href="https://github.com/rayhanwd" target="_blank" rel="noopener noreferrer">
            <AiFillGithub className="text-gray-800 text-2xl"/>
          </a>
          <a className="mx-3" href="https://www.linkedin.com/in/rayhanwd/" target="_blank" rel="noopener noreferrer">
            <AiFillLinkedin className="text-blue-700 text-2xl"/>
          </a>
          <a className="ml-3" href="https://www.youtube.com/@rayhanjs" target="_blank" rel="noopener noreferrer">
            <AiFillYoutube className="text-red-600 text-3xl"/>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
