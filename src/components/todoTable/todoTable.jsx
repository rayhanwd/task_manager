import React, { useEffect, useState } from "react";
import CreateTaskModal from "../createTaskModal/createTaskModal";
import TaskList from "../card/TaskList";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskDetailsModal from "../taskDetailsModal/taskDetailsModal";
import SelectSortField from "../inputFields/selectSortField";

const labels = ["TO DO LIST", "INPROGRESS", "DONE", "REVISED", "COMPLETED"];

const TodoTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectTask, setSelectedTask] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = updatedTasks.find(
      (task) => task.id.toString() === result.draggableId
    );

    if (movedTask) {
      const sourceLabel = result.source.droppableId.replace("-droppable", "");
      const destinationLabel = result.destination.droppableId.replace(
        "-droppable",
        ""
      );

      if (sourceLabel !== destinationLabel) {
        movedTask.label = destinationLabel;
      }

      const sourceIndex = updatedTasks.findIndex(
        (task) =>
          task.label === sourceLabel &&
          task.id.toString() === result.draggableId
      );
      const destinationIndex = updatedTasks.findIndex(
        (task) =>
          task.label === destinationLabel &&
          task.id.toString() === result.draggableId
      );

      if (sourceIndex !== -1 && destinationIndex !== -1) {
        updatedTasks.splice(sourceIndex, 1);
        updatedTasks.splice(destinationIndex, 0, movedTask);
      }

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      window.dispatchEvent(new Event("storage"));
      window.location.reload()
    }
  };
  const handleMore = (data) => {
    setIsMore(true);
    setSelectedTask(data);
  };

  const updateModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="container w-full px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div>
            <button
              className="bg-gray-800 text-white font-medium px-6 py-3"
              onClick={() => setIsOpen(true)}
            >
              Create new task
            </button>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {labels.map((label) => (
                    <th
                      className="pr-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200 w-1/5"
                      key={label}
                    >
                      <div className="flex items-center justify-between">
                        <h4>{label}</h4>
                        {tasks.filter((task) => task.label === label).length >
                          0 && (
                          <SelectSortField listname={label} isTeam={false} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {labels.map((label) => (
                    <td
                      className="pr-5 py-5 text-sm w-1/5 align-top"
                      key={label}
                    >
                      <Droppable
                        droppableId={label}
                        key={label}
                        direction="vertical"
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {tasks
                              .filter((task) => task.label === label)
                              .map((task, index) => (
                                <Draggable
                                  key={task.id}
                                  draggableId={task.id.toString()}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <TaskList
                                        task={task}
                                        IsMore={handleMore}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                            {/* Display a message when there are no tasks */}
                            {tasks.filter((task) => task.label === label)
                              .length === 0 && (
                              <p className="text-gray-500 text-center mt-4">
                                No tasks in this category. Move tasks here.
                              </p>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </DragDropContext>
        </div>
      </div>
      {
        // create new task
        isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-gray-900 opacity-80"
            ></div>
            <CreateTaskModal updateModal={updateModal} />
          </div>
        )
      }

      {
        // deatils of a task
        isMore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              onClick={() => setIsMore(false)}
              className="fixed inset-0 bg-gray-900 opacity-80"
            ></div>
            <TaskDetailsModal task={selectTask} />
          </div>
        )
      }
    </div>
  );
};

export default TodoTable;
