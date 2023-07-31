import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import SortingIcon from "../icons/SortingIcon/SortingIcon";
import "./TasksSection.scss";

export default function TasksSection() {
  return (
    <div className={"tasks-section"}>
      <div className={"tasks-section__header"}>
        <p className={"tasks-section__headline"}>Задачи Дениса</p>
        <SecondaryButton title={"Сортировка"}>
          <SortingIcon />
        </SecondaryButton>
      </div>
      <div className={"tasks"}>
        <div className={"tasks__header"}>
          <p className={'tasks__headline'}>задача</p>
          <p className={'tasks__headline'}>время</p>
        </div>
      </div>
    </div>
  );
}
