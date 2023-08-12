import "./CurrentTaskMobile.scss";
import { msToTime } from "../../../common/scripts/common";

export default function CurrentTaskMobile({ currentTask }) {
  return (
    <p className={"current-header-task-mobile"}>
      <span className={"current-header-task-mobile__title"}>{currentTask?.title}</span>{" "}
      |{" "}
      <span className={"current-header-task-mobile__time-spent-today"}>
        {msToTime(currentTask?.timeSpentTodayMs)}
      </span>
    </p>
  );
}
