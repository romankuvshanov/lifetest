import "./TaskBar.scss";
import PauseIcon from "../icons/PauseIcon/PauseIcon";
import Checkbox from "../controls/Checkbox/Checkbox";
import TrashIcon from "../icons/TrashIcon/TrashIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";
import noTasksOpenedPlaceholder from "../../assets/images/no-tasks-opened-placeholder.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  archiveTodo,
  unArchiveTodo,
} from "../../redux/tasksAndFoldersSlice";

export default function TaskBar({
  currentFolderId,
  currentTaskId,
  setCurrentTaskId,
}) {
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...foldersAndTasks].filter(
    (folder) => folder.id === currentFolderId,
  )[0];
  const currentTask = currentFolder.tasks.find(
    (task) => task.id === currentTaskId,
  );
  const dispatch = useDispatch();
  console.log(currentTask);

  function handleDeleteClick() {
    dispatch(
      deleteTodo({
        folderId: currentFolderId,
        taskId: currentTaskId,
      }),
    );
    setCurrentTaskId(null);
  }

  function handleArchiveClick() {
    dispatch(
      archiveTodo({
        folderId: currentFolderId,
        taskId: currentTaskId,
      }),
    );
    setCurrentTaskId(null);
  }

  function handleUnarchiveClick() {
    dispatch(
      unArchiveTodo({
        folderId: currentFolderId,
        taskId: currentTaskId,
      }),
    );
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
            alt={"Placeholder image when no task chosen"}
          />
        </>
      ) : (
        <>
          <p className={"task-bar__task-title"}>
            {currentTask?.title}
          </p>
          <p className={"task-bar__folder-title"}>{currentFolder?.name}</p>
          <div className={"task-bar__counter"}>
            <div className={"task-bar__today"}>
              <p className={"task-bar__date"}>сегодня</p>
              <p className={"task-bar__time"}>00:20:15</p>
            </div>
            <span className={"task-bar__pause-icon"}>
              <PauseIcon />
            </span>
            <div className={"task-bar__all"}>
              <p className={"task-bar__date"}>всего</p>
              <p className={"task-bar__time"}>13:20:15</p>
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
            <div className={"task-bar__archive"} onClick={currentFolder?.isArchive ? handleUnarchiveClick : handleArchiveClick}>
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
