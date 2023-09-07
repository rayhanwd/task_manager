import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import LiveClock from "../liveClock/LiveClock";
import { isUserDataAvailable } from "../../utils";

const TopHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    const currUser = JSON.parse(localStorage.getItem("currUser"));

    if (!currUser || Object.keys(currUser).length === 0) {
      localStorage.setItem("currUser", JSON.stringify({}));
    } else {
      localStorage.removeItem("currUser");
      const user = isUserDataAvailable();
      if (!user) {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const closeDropdownOnOutsideClick = (e) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, [isDropdownOpen]);

  return (
    <div className="flex flex-row flex-wrap md:justify-between justify-start items-center bg-white p-4 border-b border-gray-300 z-20 md:gap-0 gap-5">
      <h5 className="text-xl font-bold capitalize ml-16">Task Manager</h5>
      <LiveClock />
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button type="button" className="" onClick={()=>toggleDropdown()}>
            Profile
          </button>
        </div>
        <div
          className={`w-52 z-10 absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition duration-300 transform ${
            isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
          }`}
        >
          <ul className="my-5">
            <li className="mt-3">
              <Link className="px-5" to="/dashboard/setting">
                Account Setting
              </Link>
            </li>
            <li className="mt-3">
              <button onClick={() => handleLogout()} className="px-5">
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
