import "./TaskBar.scss";
import noTasksOpenedPlaceholder from "../../assets/images/no-tasks-opened-placeholder.png";
import Checkbox from "../controls/Checkbox/Checkbox";
import PlayPause from "../Header/PlayPause/PlayPause";
import TrashIcon from "../icons/TrashIcon/TrashIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon/ChevronLeftIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  archiveTodo,
  unArchiveTodo,
} from "../../redux/tasksAndFoldersSlice";
import { msToTime } from "../../common/scripts/common";

export default function TaskBar({
  currentFolderId,
  currentTaskId,
  setCurrentTaskId,
  setCurrentRunningTask,
  currentRunningTask,
}) {
  const tasksAndFolders = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...tasksAndFolders].filter(
    (folder) => folder.id === currentFolderId,
  )[0];
  const currentTask = currentFolder.tasks.find(
    (task) => task.id === currentTaskId,
  );
  const dispatch = useDispatch();

  function handleDeleteClick() {
    if (window.confirm("Удалить задачу?")) {
      dispatch(
        deleteTodo({
          folderId: currentFolderId,
          taskId: currentTaskId,
        }),
      );
      setCurrentTaskId(null);
    }
  }

  function handleArchiveClick() {
    dispatch(
      archiveTodo({
        folderId: currentFolderId,
        taskId: currentTaskId,
      }),
    );
    setCurrentTaskId(null);
    setCurrentRunningTask(null);
  }

  function handleUnarchiveClick() {
    dispatch(
      unArchiveTodo({
        folderId: currentFolderId,
        taskId: currentTaskId,
      }),
    );
    setCurrentTaskId(null);
  }

  function handleChange(taskId, completed) {
    dispatch(
      toggleComplete({
        folderId: currentFolderId,
        taskId: taskId,
        completed: completed,
      }),
    );
  }

  return (
    <div className={"task-bar"}>
      {currentTaskId === null ? (
        <>
          <p className={"task-bar__task-title"}>Нет открытых задач</p>
          <p className={"task-bar__folder-title"}>
            Откройте задачу, на которую планируете трекать время
          </p>
          <img
            src={noTasksOpenedPlaceholder}
            alt={"Placeholder when no task chosen"}
          />
        </>
      ) : (
        <>
          <div className={"task-bar__titles"}>
            <span
              className={"task-bar__chevron-left-mobile"}
              onClick={() => setCurrentTaskId(null)}
            >
              <ChevronLeftIcon />
            </span>
            <div className={"task-bar__titles-wrapper"}>
              <p className={"task-bar__task-title"}>{currentTask?.title}</p>
              <p className={"task-bar__folder-title"}>{currentFolder?.name}</p>
            </div>
          </div>
          <div className={"task-bar__counter"}>
            <div className={"task-bar__today"}>
              <p className={"task-bar__date"}>сегодня</p>
              <p className={"task-bar__time"}>
                {msToTime(currentTask?.timeSpentTodayMs)}
              </p>
            </div>
            <span className={"task-bar__pause-icon"}>
              <span>
                <PlayPause
                  currentRunningTask={currentRunningTask}
                  currentFolderId={currentFolderId}
                  currentTaskId={currentTaskId}
                  setCurrentRunningTask={setCurrentRunningTask}
                />
              </span>
            </span>
            <div className={"task-bar__all"}>
              <p className={"task-bar__date"}>всего</p>
              <p className={"task-bar__time"}>
                {msToTime(currentTask?.timeSpentMs)}
              </p>
            </div>
          </div>
          <div className={"task-bar__buttons"}>
            <div className={"task-bar__complete"}>
              <Checkbox
                checked={currentTask?.completed}
                onChange={() =>
                  handleChange(currentTask?.id, !currentTask?.completed)
                }
              />
              <p>Выполнено</p>
            </div>
            <div
              className={"task-bar__archive"}
              onClick={
                currentFolder?.isArchive
                  ? handleUnarchiveClick
                  : handleArchiveClick
              }
            >
              <span className={"task-bar__archive-icon"}>
                <ArchiveIcon />
              </span>
              <p>{currentFolder?.isArchive ? "Убрать из архива" : "В архив"}</p>
            </div>
            <div className={"task-bar__delete"} onClick={handleDeleteClick}>
              <span className={"task-bar__trash-icon"}>
                <TrashIcon />
              </span>
              <p>Удалить задачу</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
