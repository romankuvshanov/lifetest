import "./PlayPause.scss";
import PauseIcon from "../../icons/PauseIcon/PauseIcon";
import PlayIcon from "../../icons/PlayIcon/PlayIcon";

export default function PlayPause({
  currentRunningTask,
  currentFolderId,
  currentTaskId,
  setCurrentRunningTask,
}) {
  return (
    <>
      {currentRunningTask !== null &&
      currentRunningTask?.folderId === currentFolderId &&
      currentRunningTask?.taskId === currentTaskId ? (
        <span
          onClick={() => setCurrentRunningTask(null)}
          className={"pause-icon"}
        >
          <PauseIcon />
        </span>
      ) : (
        <span
          className={"play-icon"}
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
    </>
  );
}
