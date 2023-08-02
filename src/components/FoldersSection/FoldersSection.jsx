import "./FoldersSection.scss";
import Input from "../inputs/Input/Input";
import FolderPlusIcon from "../icons/FolderPlusIcon/FolderPlusIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";
import CloseIcon from "../icons/CloseIcon/CloseIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFolder, deleteFolder } from "../../redux/tasksAndFoldersSlice";
import { useState } from "react";

export default function FoldersSection({ currentFolderId, setCurrentFolderId }) {
  const foldersAndTasks = useSelector((state) => state.tasksAndFolders);
  const dispatch = useDispatch();
  const [newFolderName, setNewFolderName] = useState("");
  console.log(foldersAndTasks);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      dispatch(addFolder({ name: newFolderName }));
      setNewFolderName("");
      document.activeElement.blur();
    }
  }

  function handleDeleteClick(id) {
    if (window.confirm("Удалить папку?")) {
      dispatch(deleteFolder({ id: id }));
      setCurrentFolderId(0);
    }
  }

  return (
    <div className={"folders-section"}>
      <Input
        placeholder={"Добавить папку"}
        onKeyDown={handleKeyDown}
        value={newFolderName}
        onChange={(event) => setNewFolderName(event.target.value)}
      >
        <FolderPlusIcon />
      </Input>

      {[...foldersAndTasks]
        .sort((a, b) => b.id - a.id)
        .map((folder) => {
          return (
            <div
              className={`folders-section__folder ${currentFolderId === folder?.id && 'folders-section__folder--active'}`}
              key={folder.id}
              onClick={() => setCurrentFolderId(folder.id)}
            >
              <p className={"folders-section__paragraph"}>{folder.name}</p>
              {folder.canDelete && (
                <span onClick={() => handleDeleteClick(folder.id)}>
                  <CloseIcon />
                </span>
              )}
            </div>
          );
        })}

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
