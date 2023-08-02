import Header from "./components/Header/Header";
import FoldersSection from "./components/FoldersSection/FoldersSection";
import TasksSection from "./components/TasksSection/TasksSection";
import "./App.scss";
import { useState } from "react";

export default function App() {
  const [currentFolderId, setCurrentFolderId] = useState(0);

  return (
    <div className={"app"}>
      <Header />
      <div className={"mainSection"}>
        <FoldersSection currentFolderId={currentFolderId} setCurrentFolderId={setCurrentFolderId} />
        <TasksSection currentFolderId={currentFolderId} />
      </div>
    </div>
  );
}
