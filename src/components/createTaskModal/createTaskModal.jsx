import React, { useState } from "react";
import InputField from "../inputFields/inputField";
import TextAreaField from "../inputFields/textareaField";
import SelectField from "../inputFields/selectField";

const CreateTaskForm = ({ updateModal, team }) => {
  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const labelOptions = [
    { value: "TO DO LIST", label: "TO DO LIST" },
    { value: "INPROGRESS", label: "INPROGRESS" },
    { value: "DONE", label: "DONE" },
    { value: "REVISED", label: "REVISED" },
    { value: "COMPLETED", label: "COMPLETED" },
  ];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    priority_level: "",
    label: "",
    assigned: [],
  });

  const [member, setMember] = useState(null);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    due_date: "",
    priority_level: "",
    label: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleAddTeamMember = () => {
    if (!formData.assigned.includes(member)) {
      setFormData((prevData) => ({
        ...prevData,
        assigned: [...prevData.assigned, member],
      }));
    }
    setMember("");
  };
 

  const validateForm = () => {
    const newErrors = {};
    let formIsValid = true;

    if (!formData.title) {
      newErrors.title = "Title is required";
      formIsValid = false;
    }

    if (!formData.description) {
      newErrors.description = "Description is required";
      formIsValid = false;
    }

    if (!formData.due_date) {
      newErrors.due_date = "Due date is required";
      formIsValid = false;
    }

    if (!formData.priority_level) {
      newErrors.priority_level = "Priority level is required";
      formIsValid = false;
    }

    if (!formData.label) {
      newErrors.label = "Label is required";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        ...formData,
      };

      const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      // Add the new task to the array
      existingTasks.push(newTask);

      // Update the tasks in local storage
      localStorage.setItem("tasks", JSON.stringify(existingTasks));

      // Clear the form data
      setFormData({
        title: "",
        description: "",
        due_date: "",
        priority_level: "",
        label: "",
        assigned: [],
      });
      setMember();
      updateModal();
      window.location.reload();
    }
  };

  return (
    <div className="bg-white rounded shadow-lg relative w-2/5 mx-auto p-4 overflow-y-scroll z-50">
      <h2 className="text-2xl font-bold mb-4">Create a Task for your team</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          name="title"
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        <TextAreaField
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
        />

        <InputField
          name="due_date"
          type="date"
          placeholder="Due Date"
          value={formData.due_date}
          onChange={handleChange}
          error={errors.due_date}
        />

        <SelectField
          name="priority_level"
          options={priorityOptions}
          value={formData.priority_level}
          onChange={handleChange}
          error={errors.priority_level}
        />

        <SelectField
          name="label"
          options={labelOptions}
          value={formData.label}
          onChange={handleChange}
          error={errors.label}
        />

        <div className="mb-4">
          <label
            htmlFor="assigned"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Assigned Team Members
          </label>
          <div className="flex items-center">
            <input
              name="assigned"
              type="text"
              autoComplete="off"
              className={`flex-1 rounded-md border-2 py-1.5 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none ${
                errors.assigned ? "border-red-500" : ""
              }`}
              value={member}
              onChange={(e) => setMember(e.target.value)}
            />
            <button
              type="button"
              onClick={() => handleAddTeamMember()}
              className="px-3 py-1 ml-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none"
            >
              Add
            </button>
          </div>
          {errors.assigned && (
            <p className="mt-1 text-sm text-red-500">{errors.assigned}</p>
          )}
          <ul className="mt-2">
            {formData.assigned.length > 0 &&
              formData.assigned.map((member, index) => (
                <li key={index} className="text-gray-700">
                  {member}
                </li>
              ))}
          </ul>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
