import Header from "./components/Header/Header";
import FoldersSection from "./components/FoldersSection/FoldersSection";
import TasksSection from "./components/TasksSection/TasksSection";
import "./App.scss";
import { useEffect, useState } from "react";
import TaskBar from "./components/TaskBar/TaskBar";
import { addASecondToTaskTimeTracked } from "./redux/tasksAndFoldersSlice";
import { useDispatch } from "react-redux";

export default function App() {
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentRunningTask, setCurrentRunningTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentRunningTask !== null) {
      const timerId = setInterval(() => {
        dispatch(
          addASecondToTaskTimeTracked({
            folderId: currentRunningTask?.folderId,
            taskId: currentRunningTask?.taskId,
          }),
        );
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [currentRunningTask, dispatch]);

  return (
    <div className={"app"}>
      <Header
        currentFolderId={currentFolderId}
        currentTaskId={currentTaskId}
        currentRunningTask={currentRunningTask}
        setCurrentRunningTask={setCurrentRunningTask}
        setCurrentFolderId={setCurrentFolderId}
        setCurrentTaskId={setCurrentTaskId}
      />
      <div className={"mainSection"}>
        <FoldersSection
          currentFolderId={currentFolderId}
          setCurrentFolderId={setCurrentFolderId}
          setCurrentTaskId={setCurrentTaskId}
        />
        <TasksSection
          currentFolderId={currentFolderId}
          currentTaskId={currentTaskId}
          setCurrentTaskId={setCurrentTaskId}
        />
        <TaskBar
          currentFolderId={currentFolderId}
          currentTaskId={currentTaskId}
          currentRunningTask={currentRunningTask}
          setCurrentTaskId={setCurrentTaskId}
          setCurrentRunningTask={setCurrentRunningTask}
        />
      </div>
    </div>
  );
}
