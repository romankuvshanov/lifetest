import "./CurrentTaskDesktop.scss";
import PlayPause from "../PlayPause/PlayPause";
import { msToTime } from "../../../common/scripts/common";

export default function CurrentTaskDesktop({
  currentTask,
  currentRunningTask,
  currentFolderId,
  currentTaskId,
  setCurrentRunningTask,
}) {
  return (
    <>
      <div className={"current-header-task"}>
        <p>{currentTask?.title}</p>
        <PlayPause
          currentRunningTask={currentRunningTask}
          currentFolderId={currentFolderId}
          currentTaskId={currentTaskId}
          setCurrentRunningTask={setCurrentRunningTask}
        />
      </div>
      <div className={"current-header-task-time"}>
        <p>
          Сегодня:{" "}
          <span className={"current-header-task-time__title"}>
            {msToTime(currentTask?.timeSpentTodayMs)}
          </span>
        </p>
      </div>
    </>
  );
}
