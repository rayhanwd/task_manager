import React from "react";

const TaskDetailsModal = ({ task }) => {
  return (
    <div className="bg-white rounded shadow-lg relative w-2/5 mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Details of a Task</h2>
      <h4 className="mt-2">Task name: {task.title}</h4>
      <p className="mt-2">Details: {task.description}</p>
      <p className="mt-2">Label: {task.label}</p>
      <p className="mt-2">Priority: {task.priority_level}</p>
      <p className="mt-2">Assigned members:</p>
      <ul className="pl-3">
        {task.assigned.map((member) => (
          <li className="list-decimal">{member}</li>
        ))}
      </ul>
      <p className="mt-2">Due date: {task.due_date}</p>
    </div>
  );
};

export default TaskDetailsModal;
