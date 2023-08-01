import "./FoldersSection.scss";
import Input from "../inputs/Input/Input";
import FolderPlusIcon from "../icons/FolderPlusIcon/FolderPlusIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";
import CloseIcon from "../icons/CloseIcon/CloseIcon";

export default function FoldersSection() {
  return (
    <div className={"folders-section"}>
      <Input placeholder={"Добавить папку"}>
        <FolderPlusIcon />
      </Input>

      {folders.map((folder) => {
        return (
          <div className={"folders-section__folder"} key={folder.id}>
            <p className={"folders-section__paragraph"}>{folder.name}</p>
            <CloseIcon />
          </div>
        );
      })}

      <div className={"folders-section__folder"}>
        <p className={"folders-section__paragraph"}>Основные задачи</p>
      </div>

      <div
        className={"folders-section__folder folders-section__folder--archive"}
      >
        <p className={"folders-section__paragraph"}>
          <ArchiveIcon />
          Архив
        </p>
      </div>
    </div>
  );
}

const folders = [
  {
    name: "Аутсорс",
    tasks: [],
    id: 0,
  },
  {
    name: "Задачи на февраль",
    tasks: [],
    id: 1,
  },
  {
    name: "Задачи дениса",
    tasks: [],
    id: 2,
  },
];
