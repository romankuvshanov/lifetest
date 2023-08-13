import "./Header.scss";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import TrackedToday from "./TrackedToday/TrackedToday";
import CurrentTaskMobile from "./CurrentTaskMobile/CurrentTaskMobile";
import PlayPause from "./PlayPause/PlayPause";
import CurrentTaskDesktop from "./CurrentTaskDesktop/CurrentTaskDesktop";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header({
  currentFolderId,
  currentTaskId,
  currentRunningTask,
  setCurrentRunningTask,
  setCurrentFolderId,
  setCurrentTaskId,
}) {
  const tasksAndFolders = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...tasksAndFolders].filter(
    (folder) => folder.id === currentFolderId,
  )[0];
  const currentTask = currentFolder.tasks.find(
    (task) => task.id === currentTaskId,
  );

  const [showTrackedTodayMenu, setShowTrackedTodayMenu] = useState(false);

  const [windowSize, setWindowSize] = useState({
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

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

  const showCurrentTask =
    currentTaskId !== null &&
    currentTask?.lastDayTracked === new Date().toDateString();

  return (
    <header className={"header"}>
      <HeaderLogo />

      {showCurrentTask && (
        <>
          <div
            className={"header__task-time-wrapper"}
            onMouseEnter={() => setShowTrackedTodayMenu(true)}
          >
            {windowSize.innerWidth < 767 ? (
              <CurrentTaskMobile currentTask={currentTask} />
            ) : (
              <CurrentTaskDesktop
                currentRunningTask={currentRunningTask}
                currentFolderId={currentFolderId}
                currentTask={currentTask}
                currentTaskId={currentTaskId}
                setCurrentRunningTask={setCurrentRunningTask}
              />
            )}

            {showTrackedTodayMenu && (
              <TrackedToday
                currentRunningTask={currentRunningTask}
                setCurrentRunningTask={setCurrentRunningTask}
                currentFolderId={currentFolderId}
                currentTaskId={currentTaskId}
                setShowTrackedTodayMenu={setShowTrackedTodayMenu}
                setCurrentFolderId={setCurrentFolderId}
                setCurrentTaskId={setCurrentTaskId}
              />
            )}
          </div>

          {windowSize.innerWidth < 767 && (
            <PlayPause
              currentRunningTask={currentRunningTask}
              currentFolderId={currentFolderId}
              currentTaskId={currentTaskId}
              setCurrentRunningTask={setCurrentRunningTask}
            />
          )}
        </>
      )}
    </header>
  );
}
