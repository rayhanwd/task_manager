import React, { useEffect, useRef, useState } from "react";

const priorityClasses = {
  Low: "text-green-500",
  Medium: "text-yellow-500",
  High: "text-red-500",
};

const TeamTaskList = ({ task, IsMore }) => {
  const priorityClass = priorityClasses[task.priority_level] || "";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const toggleMore = (task) => {
    IsMore(task);
  };

  const handleRemoveTask = (taskToRemove) => {
    const storedTasks = JSON.parse(localStorage.getItem("taskTeams")) || [];
    const updatedTasks = storedTasks.filter(
      (task) => task.id !== taskToRemove.id
    );
    localStorage.setItem("taskTeams", JSON.stringify(updatedTasks));
    window.dispatchEvent(new Event("storage"));
    closeDropdown();
    window.location.reload();
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
    <div
      key={task.id}
      className="card rounded shadow border-gray-100 bg-gray-800 text-white mb-5 px-2 py-3"
    >
      <div className="flex justify-between align-top">
        <h6 className="font-medium capitalize">{task.title}</h6>
        <div>
          {" "}
          <div className="relative inline-block text-left" ref={dropdownRef}>
            <div>
              <button
                type="button"
                className="font-bold text-lg"
                onClick={toggleDropdown}
              >
                ...
              </button>
            </div>
            <div
              className={`absolute right-0 mt-2 origin-top-right bg-gray-900 rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition duration-300 transform ${
                isDropdownOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <ul className="my-5">
                <li className="mt-3">
                  <button onClick={() => toggleMore(task)} className="px-1">
                    View details
                  </button>
                </li>
                <li className="mt-3">
                  <button
                    onClick={() => handleRemoveTask(task)}
                    className="px-5"
                  >
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <p>{task.description}</p>
      <div className="flex justify-between items-center">
        <p className={`${priorityClass}`}>{task.priority_level}</p>
        <div>
          <button
            type="button"
            className="w-6 h-6 text-base  rounded-full text-white bg-red-500 mr-2"
          >
            <span className="p-0 text-xs">{task?.assigned?.length}</span>
          </button>
          <span>Members</span>
        </div>
      </div>
    </div>
  );
};

export default TeamTaskList;
