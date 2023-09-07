import React, { useState, useEffect } from "react";

const SelectSortField = ({ listname, isTeam }) => {
  const [sortBy, setSortBy] = useState(null);
  const [tasks, setTasks] = useState([]);

  const handleSortBy = (sortBy) => {
    setSortBy(sortBy);

    if (sortBy === "priority" || sortBy === "due_date") {
      const filteredTasks = tasks.filter((task) => task.label === listname);
      if (sortBy === "priority") {
        filteredTasks.sort((a, b) => {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return (
            priorityOrder[b.priority_level] - priorityOrder[a.priority_level]
          );
        });
      } else if (sortBy === "due_date") {
        filteredTasks.sort(
          (a, b) => new Date(a.due_date) - new Date(b.due_date)
        );
      }

      const updatedTasks = tasks.map((task) =>
        task.label === listname ? filteredTasks.shift() : task
      );

      setTasks(updatedTasks);
      setSortBy("");
      if (isTeam) {
        localStorage.setItem("taskTeams", JSON.stringify(updatedTasks));
        window.location.reload();
      } else {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    setSortBy("");
  }, []);

  return (
    <select value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
      <option value="" disabled>
        Sort by
      </option>
      <option value="priority">Priority</option>
      <option value="due_date">Due date</option>
    </select>
  );
};

export default SelectSortField;
