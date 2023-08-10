import Header from "./components/Header/Header";
import FoldersSection from "./components/FoldersSection/FoldersSection";
import TasksSection from "./components/TasksSection/TasksSection";
import "./App.scss";
import { useEffect, useState } from "react";
import TaskBar from "./components/TaskBar/TaskBar";
import { addASecondToTaskTimeTracked } from "./redux/tasksAndFoldersSlice";
import { useDispatch } from "react-redux";
import FolderIcon from "./components/icons/FolderIcon/FolderIcon";

export default function App() {
  const [currentFolderId, setCurrentFolderId] = useState(0);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [currentRunningTask, setCurrentRunningTask] = useState(null);
  const [showFolderSection, setShowFolderSection] = useState(
    window.innerWidth > 1000,
  );
  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });
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

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
        {showFolderSection &&
        (windowSize.innerWidth >= 1440 || currentTaskId === null) ? (
          <FoldersSection
            currentFolderId={currentFolderId}
            setCurrentFolderId={setCurrentFolderId}
            setCurrentTaskId={setCurrentTaskId}
            setShowFolderSection={setShowFolderSection}
          />
        ) : (
          <div className={"folders-section-empty"}>
            <span
              className={"folders-section-empty__folder-icon"}
              onClick={() => {
                setCurrentTaskId(null);
                setShowFolderSection(true);
              }}
            >
              <FolderIcon />
            </span>
          </div>
        )}
        {windowSize.innerWidth < 767 && currentTaskId !== null ? (
          ""
        ) : (
          <TasksSection
            currentFolderId={currentFolderId}
            currentTaskId={currentTaskId}
            setCurrentTaskId={setCurrentTaskId}
            setShowFolderSection={setShowFolderSection}
          />
        )}

        {(windowSize.innerWidth >= 1440 || currentTaskId !== null) && (
          <TaskBar
            currentFolderId={currentFolderId}
            currentTaskId={currentTaskId}
            currentRunningTask={currentRunningTask}
            setCurrentTaskId={setCurrentTaskId}
            setCurrentRunningTask={setCurrentRunningTask}
          />
        )}
      </div>
    </div>
  );
}
