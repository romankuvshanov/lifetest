import emblem from "../../assets/images/emblem.svg";
import PauseIcon from "../icons/PauseIcon/PauseIcon";
import "./Header.scss";
import { useSelector } from "react-redux";
import { msToTime } from "../../common/scripts/common";
import PlayIcon from "../icons/PlayIcon/PlayIcon";
import { useEffect, useState } from "react";
import TrackedToday from "./TrackedToday/TrackedToday";

export default function Header({
  currentFolderId,
  currentTaskId,
  currentRunningTask,
  setCurrentRunningTask,
  setCurrentFolderId,
  setCurrentTaskId,
}) {
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...foldersAndTasks].filter(
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

  return (
    <header className={"header"}>
      <div className={"header__logo"}>
        <img src={emblem} alt={"Life logo"} className={"header__emblem"} />
        <p className={"header__title"}>LifeTest</p>
      </div>

      {currentTaskId !== null &&
        currentTask?.lastDayTracked === new Date().toDateString() && (
          <>
            <div
              className={"header__task-time-wrapper"}
              onMouseEnter={() => setShowTrackedTodayMenu(true)}
            >
              {windowSize.innerWidth < 767 ? (
                <p className={"header__task-mobile"}>
                  <span className={"header__task-title-mobile"}>
                    {currentTask?.title}
                  </span>{" "}
                  |{" "}
                  <span className={"header__task-time-mobile"}>
                    {msToTime(currentTask?.timeSpentTodayMs)}
                  </span>
                </p>
              ) : (
                <>
                  <div className={"header__task"}>
                    <p>{currentTask?.title}</p>
                    {currentRunningTask !== null &&
                    currentRunningTask?.folderId === currentFolderId &&
                    currentRunningTask?.taskId === currentTaskId ? (
                      <span
                        onClick={() => setCurrentRunningTask(null)}
                        className={"header__pause-icon"}
                      >
                        <PauseIcon />
                      </span>
                    ) : (
                      <span
                        className={"header__pause-icon"}
                        onClick={() =>
                          setCurrentRunningTask({
                            folderId: currentFolderId,
                            taskId: currentTaskId,
                          })
                        }
                      >
                        <PlayIcon />
                      </span>
                    )}
                  </div>
                  <div className={"header__time"}>
                    <p>
                      Сегодня:{" "}
                      <span className={"header__time-title"}>
                        {msToTime(currentTask?.timeSpentTodayMs)}
                      </span>
                    </p>
                  </div>
                </>
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

            {windowSize.innerWidth < 767 &&
              (currentRunningTask !== null &&
              currentRunningTask?.folderId === currentFolderId &&
              currentRunningTask?.taskId === currentTaskId ? (
                <span
                  onClick={() => setCurrentRunningTask(null)}
                  className={"header__pause-icon"}
                >
                  <PauseIcon />
                </span>
              ) : (
                <span
                  className={"header__pause-icon"}
                  onClick={() =>
                    setCurrentRunningTask({
                      folderId: currentFolderId,
                      taskId: currentTaskId,
                    })
                  }
                >
                  <PlayIcon />
                </span>
              ))}
          </>
        )}
    </header>
  );
}
