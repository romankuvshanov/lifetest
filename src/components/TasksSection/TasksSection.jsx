import "./TasksSection.scss";
import Input from "../inputs/Input/Input";
import PlusIcon from "../icons/PlusIcon/PlusIcon";
import Checkbox from "../controls/Checkbox/Checkbox";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleComplete, addTodo } from "../../redux/tasksAndFoldersSlice";
import { useState } from "react";
import { msToTime } from "../../common/scripts/common";
import zeroTasksPlaceholderImage from "../../assets/images/zero-tasks-placeholder.png";
import Sorting from "./Sorting/Sorting";

const SortingTypes = {
  BYDATE: (a, b) => new Date(b?.dateCreated) - new Date(a?.dateCreated),
  BYTIMESPENT: (a, b) => a?.timeSpentMs - b?.timeSpentMs,
  BYSTATUS: (a, b) =>
    a?.completed - b?.completed || a?.title.localeCompare(b?.title),
  BYALPHABET: (a, b) => a?.title.localeCompare(b?.title),
};

export default function TasksSection({
  currentFolderId,
  currentTaskId,
  setCurrentTaskId,
}) {
  const [newTaskName, setNewTaskName] = useState("");
  const [currentSortingType, setCurrentSortingType] = useState('BYALPHABET');
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  const currentFolder = [...foldersAndTasks].filter(
    (folder) => folder.id === currentFolderId,
  )[0];
  const dispatch = useDispatch();

  console.log(currentSortingType);

  function handleChange(taskId, completed) {
    dispatch(
      toggleComplete({
        folderId: currentFolderId,
        taskId: taskId,
        completed: completed,
      }),
    );
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && newTaskName.length > 0) {
      dispatch(
        addTodo({
          folderId: currentFolderId,
          title: newTaskName,
        }),
      );
      setNewTaskName("");
      document.activeElement.blur();
    }
  }

  return (
    <>
      <div className={"tasks-section"}>
        <div className={"tasks-section__header"}>
          <p className={"tasks-section__headline"}>{currentFolder?.name}</p>
          <Sorting currentSortingType={currentSortingType} setCurrentSortingType={setCurrentSortingType} />
        </div>
        <div className={"tasks"}>
          <div className={"tasks__header"}>
            <p className={"tasks__headline"}>задача</p>
            <p className={"tasks__headline"}>время</p>
          </div>
          {!currentFolder?.isArchive && (
            <Input
              placeholder={"Добавить задачу"}
              value={newTaskName}
              onChange={(event) => setNewTaskName(event.target.value)}
              onKeyDown={handleKeyDown}
              maxLength={64}
            >
              <PlusIcon />
            </Input>
          )}
          {currentFolder?.tasks.length === 0 && (
            <img
              className={"tasks__image-placeholder"}
              src={zeroTasksPlaceholderImage}
              alt={"Placeholder when there are zero tasks"}
            />
          )}
          {currentFolder?.tasks
            .filter((task) => task?.archived === false)
            .sort(SortingTypes[currentSortingType])
            .map((task) => {
              return (
                <div
                  className={`tasks__task ${
                    currentTaskId === task?.id && "tasks__task--active"
                  }`}
                  key={task?.id}
                  onClick={() => setCurrentTaskId(task?.id)}
                >
                  <p className={"task__title-wrapper"}>
                    <Checkbox
                      checked={task?.completed}
                      onChange={() => handleChange(task?.id, !task?.completed)}
                    />
                    <span className={"task__title"}>{task?.title}</span>
                  </p>
                  <p className={"task__time"}>
                    {task?.timeSpentMs ? msToTime(task?.timeSpentMs) : ""}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
