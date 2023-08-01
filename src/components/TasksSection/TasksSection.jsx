import SecondaryButton from "../buttons/SecondaryButton/SecondaryButton";
import SortingIcon from "../icons/SortingIcon/SortingIcon";
import "./TasksSection.scss";
import Input from "../inputs/Input/Input";
import PlusIcon from "../icons/PlusIcon/PlusIcon";
import Checkbox from "../controls/Checkbox/Checkbox";

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
          <p className={"tasks__headline"}>задача</p>
          <p className={"tasks__headline"}>время</p>
        </div>
        <Input>
          <PlusIcon />
        </Input>
        <div className={"tasks__task"}>
            <p className={'task__title-wrapper'}><Checkbox /><span className={'task__title'}>Провести митап</span></p>
            <p className={'task__time'}>01:15:00</p>
        </div>
      </div>
    </div>
  );
}
