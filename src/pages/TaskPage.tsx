import React from "react";
import NavigationWrapper from "../components/layout/NavigationWrapper";
import TaskManager from "../components/mainComponents/TaskManager";

const TaskPage = () => {
  return (
    <div>
      <NavigationWrapper />
      <TaskManager />
    </div>
  );
};

export default TaskPage;
