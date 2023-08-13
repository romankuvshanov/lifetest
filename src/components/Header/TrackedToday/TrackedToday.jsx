import "./TrackedToday.scss";
import PlayIcon from "../../icons/PlayIcon/PlayIcon";
import PauseIcon from "../../icons/PauseIcon/PauseIcon";
import DoneIcon from "../../icons/DoneIcon/DoneIcon";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import { useSelector } from "react-redux";
import { msToTime } from "../../../common/scripts/common";

export default function TrackedToday({
  currentRunningTask,
  setCurrentRunningTask,
  setCurrentTaskId,
  setCurrentFolderId,
  setShowTrackedTodayMenu,
}) {
  const tasksAndFolders = useSelector((state) => state.tasksAndFolders);
  const tasksTrackedToday = [...tasksAndFolders]
    .map((folder) =>
      folder?.tasks
        .filter((task) => task?.lastDayTracked === new Date().toDateString())
        .map((task) => ({ ...task, folderId: folder?.id })),
    )
    .flat();

  return (
    <>
      <div
        className={"tracked-today-overlay"}
        onClick={() => setShowTrackedTodayMenu(false)}
      ></div>
      <div className={"modal-wrapper"}>
        <div
          className={"tracked-today"}
          onMouseLeave={() => setShowTrackedTodayMenu(false)}
        >
          <p className={"tracked-today__currentDay"}>
            <span
              className={"tracked-today__icon-mobile"}
              onClick={() => setShowTrackedTodayMenu(false)}
            >
              <CloseIcon />
            </span>

            {new Date().toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}

            <span
              className={"tracked-today__icon-mobile"}
              onClick={() => setShowTrackedTodayMenu(false)}
            >
              <DoneIcon />
            </span>
          </p>
          <ul className={"tracked-today__tasks"}>
            {tasksTrackedToday.map((task) => {
              return (
                <li
                  className={`tracked-today__task ${
                    currentRunningTask?.taskId === task?.id &&
                    "tracked-today__task--active"
                  }`}
                  key={task?.id}
                >
                  <span className={"tracked-today__icon-and-title"}>
                    {currentRunningTask?.taskId === task?.id ? (
                      <span
                        onClick={() => setCurrentRunningTask(null)}
                        className={"tracked-today__pause-icon"}
                      >
                        <PauseIcon />
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          setCurrentRunningTask({
                            folderId: task?.folderId,
                            taskId: task?.id,
                          })
                        }
                        className={"tracked-today__play-icon"}
                      >
                        <PlayIcon />
                      </span>
                    )}
                    <span
                      className={"tracked-today__task-title"}
                      onClick={() => {
                        setCurrentFolderId(task?.folderId);
                        setCurrentTaskId(task?.id);
                      }}
                    >
                      {task?.title}
                    </span>
                  </span>
                  <span className={"tracked-today__time"}>
                    {msToTime(task?.timeSpentTodayMs)}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
