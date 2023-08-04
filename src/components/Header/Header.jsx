import emblem from "../../assets/images/emblem.svg";
import PauseIcon from "../icons/PauseIcon/PauseIcon";
import "./Header.scss";
import { useSelector } from "react-redux";
import { msToTime } from "../../common/scripts/common";
import PlayIcon from "../icons/PlayIcon/PlayIcon";

export default function Header({
  currentFolderId,
  currentTaskId,
  currentRunningTask,
  setCurrentRunningTask,
}) {
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...foldersAndTasks].filter(
    (folder) => folder.id === currentFolderId,
  )[0];
  const currentTask = currentFolder.tasks.find(
    (task) => task.id === currentTaskId,
  );

  return (
    <header className={"header"}>
      <div className={"header__logo"}>
        <img src={emblem} alt={"Life logo"} className={"header__emblem"} />
        <p className={"header__title"}>LifeTest</p>
      </div>
      {currentTaskId !== null &&
        new Date(currentTask.lastDayTracked).toDateString() ===
          new Date().toDateString() && (
          <div className={"header__task-time-wrapper"}>
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
                Сегодня{" "}
                <span className={"header__time-title"}>
                  {msToTime(currentTask?.timeSpentTodayMs)}
                </span>
              </p>
            </div>
          </div>
        )}
    </header>
  );
}
