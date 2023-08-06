import "./TrackedToday.scss";
import { useSelector } from "react-redux";
import PlayIcon from "../../icons/PlayIcon/PlayIcon";
import { msToTime } from "../../../common/scripts/common";
import PauseIcon from "../../icons/PauseIcon/PauseIcon";

export default function TrackedToday({
  currentRunningTask,
  setCurrentRunningTask,
  currentTaskId,
  currentFolderId,
}) {
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  console.log(foldersAndTasks);

  const tasksTrackedToday = [...foldersAndTasks]
    .map((folder) =>
      folder?.tasks
        .filter(
          (task) =>
            new Date(task?.lastDayTracked).toDateString() ===
            new Date().toDateString(),
        )
        .map((task) => ({ ...task, folderId: folder?.id })),
    )
    .flat();

  console.log(tasksTrackedToday);

  return (
    <div className={"modal-wrapper"}>
      <div className={"tracked-today"}>
        <p className={"tracked-today__currentDay"}>
          {new Date().toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          })}
        </p>
        <ul className={"tracked-today__tasks"}>
          {tasksTrackedToday.map((task) => {
            return (
              <li className={"tracked-today__task"}>
                <span className={"tracked-today__icon-and-title"}>
                  {currentRunningTask?.taskId === task?.id ? (
                    <span onClick={() => setCurrentRunningTask(null)} className={"tracked-today__pause-icon"}>
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
                  <span className={"tracked-today__task-title"}>
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
  );
}
