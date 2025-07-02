import React from "react";
import AddTask from "../taskManager/addTask";
import GetTask from "../taskManager/getTask";
import Footer from "./footer";

const TaskDashboard = () => {
  return (
    <div className="relative">
      {/* Full viewport background */}
      <div className="fixed inset-0 w-full h-full bg-gray-50 -z-10"></div>
      <div className="py-17 px-4 mb-10">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Welcome to the Task Manager
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          This is your task manager.<br/>
          Please plan your future task here. Dont be lazy, be productive !
        </p>
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto">
          <div className="flex-1">
            <AddTask />
          </div>
          <div className="flex-1">
            <GetTask />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TaskDashboard;
