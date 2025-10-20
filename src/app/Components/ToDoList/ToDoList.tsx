"use client";

import { SetStateAction, useState, useEffect, useRef } from "react";

export default function ToDoList() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  let handleInput = (e: { target: { value: SetStateAction<string> } }) => {
    setTask(e.target.value);
  };

  let handleAddTask = () => {
    setTaskList((prevTasks) => [...prevTasks, task]);
    setTask("");
    if (taskInput.current !== null) {
      taskInput.current.value = "";
    }
  };

  let handleAddTaskOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && e.currentTarget.value !== ''){
        handleAddTask();
    }
  }

  let handleRemoveTask = (taskToRemove: string) => {
    const updatedTaskList = taskList.filter((task) => task !== taskToRemove);
    setTaskList(updatedTaskList);
  };

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem("myTasks");
      if (savedTasks) {
        setTaskList(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Could not load from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.myTasks) {
      localStorage.setItem("myTasks", JSON.stringify([]));
    }

    if (taskList.length) {
      localStorage.setItem("myTasks", JSON.stringify(taskList));
    } else {
      localStorage.setItem("myTasks", JSON.stringify(taskList));
    }
  }, [taskList]);

  return (
    <section className="bg-cyan-950 p-6">
      <h2 className="text-center mb-2.5 text-2xl">React To Do List</h2>
      <div className="text-center flex flex-col items-center mb-3.5">
        <label htmlFor="task" hidden>
          Task
        </label>
        <input
          ref={taskInput}
          id="task"
          name="task"
          className="underline ml-2.5 text-center bg-cyan-800"
          type="text"
          placeholder="Enter task"
          onKeyDown={handleAddTaskOnKeyDown}
          onChange={handleInput}
        />
      </div>
      <div className="text-center mb-10">
        <button
          className="rounded-2xl border-2 p-3.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddTask}
          disabled={task === "" ? true : false}
        >
          Add Task
        </button>
      </div>
      <div className="text-center">
        <p className="text-xl mb-2.5 underline">
          {!taskList.length ? "No Current Tasks" : "List of Tasks"}
        </p>
        <ul className="relative">
          {taskList.map((el, i) => {
            return (
              <li className=" mb-1.5" key={i}>
                <span>{el}</span>
                <span
                  onClick={() => handleRemoveTask(el)}
                  className="border-amber-700 border rounded inline-block w-5 relative left-2 cursor-pointer"
                >
                  -
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
