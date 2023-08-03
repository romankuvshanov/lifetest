import Header from "./components/Header/Header";
import FoldersSection from "./components/FoldersSection/FoldersSection";
import TasksSection from "./components/TasksSection/TasksSection";
import "./App.scss";
import { useState } from "react";
import TaskBar from "./components/TaskBar/TaskBar";

export default function App() {
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  return (
    <div className={"app"}>
      <Header />
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
          setCurrentTaskId={setCurrentTaskId}
        />
      </div>
    </div>
  );
}
