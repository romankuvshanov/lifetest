import "./TaskBar.scss";
import PauseIcon from "../icons/PauseIcon/PauseIcon";
import Checkbox from "../controls/Checkbox/Checkbox";
import TrashIcon from "../icons/TrashIcon/TrashIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";

export default function TaskBar() {
  return (
    <div className={"task-bar"}>
      <p className={"task-bar__task-title"}>Сделать UI-kit</p>
      <p className={"task-bar__folder-title"}>Основные задачи</p>
      <div className={"task-bar__counter"}>
        <div className={"task-bar__today"}>
          <p className={'task-bar__date'}>сегодня</p>
          <p className={'task-bar__time'}>00:20:15</p>
        </div>
        <span className={'task-bar__pause-icon'}><PauseIcon /></span>
        <div className={"task-bar__all"}>
          <p className={'task-bar__date'}>всего</p>
          <p className={'task-bar__time'}>13:20:15</p>
        </div>
      </div>
      <div className={"task-bar__buttons"}>
        <div className={"task-bar__complete"}>
          <Checkbox />
          <p>Выполнено</p>
        </div>
        <div className={"task-bar__archive"}>
          <span className={'task-bar__archive-icon'}><ArchiveIcon /></span>
          <p>В архив</p>
        </div>
        <div className={"task-bar__delete"}>
          <span className={'task-bar__trash-icon'}><TrashIcon /></span>
          <p>Удалить задачу</p>
        </div>
      </div>
    </div>
  );
}