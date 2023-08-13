import "./FoldersSection.scss";
import Input from "../inputs/Input/Input";
import FolderPlusIcon from "../icons/FolderPlusIcon/FolderPlusIcon";
import ArchiveIcon from "../icons/ArchiveIcon/ArchiveIcon";
import CloseIcon from "../icons/CloseIcon/CloseIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addFolder, deleteFolder } from "../../redux/tasksAndFoldersSlice";
import { useState } from "react";

export default function FoldersSection({
  currentFolderId,
  setCurrentFolderId,
  setCurrentTaskId,
  setShowFolderSection,
}) {
  const dispatch = useDispatch();
  const tasksAndFolders = useSelector((state) => state.tasksAndFolders);
  const [newFolderName, setNewFolderName] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter" && newFolderName.length > 0) {
      dispatch(addFolder({ name: newFolderName }));
      setNewFolderName("");
      document.activeElement.blur();
    }
  }

  function handleDeleteClick(id) {
    if (window.confirm("Удалить папку?")) {
      setCurrentFolderId(0);
      dispatch(deleteFolder({ id: id }));
    }
  }

  return (
    <>
      <div
        className={"folders-section__overlay"}
        onClick={() => setShowFolderSection(false)}
      ></div>
      <div className={"folders-section"}>
        <Input
          placeholder={"Добавить папку"}
          onKeyDown={handleKeyDown}
          value={newFolderName}
          onChange={(event) => setNewFolderName(event.target.value)}
          maxLength={32}
        >
          <FolderPlusIcon />
        </Input>

        {[...tasksAndFolders]
          .sort((a, b) => b.id - a.id)
          .map((folder) => {
            return (
              <div
                className={`folders-section__folder ${
                  currentFolderId === folder?.id &&
                  "folders-section__folder--active"
                }`}
                key={folder.id}
                onClick={() => {
                  setCurrentFolderId(folder.id);
                  setCurrentTaskId(null);
                }}
              >
                <p
                  className={`folders-section__paragraph ${
                    folder?.isArchive && "folders-section__folder--archive"
                  }`}
                >
                  {folder?.isArchive && <ArchiveIcon />}
                  {folder.name}
                </p>
                {folder.canDelete && (
                  <span
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteClick(folder.id);
                    }}
                  >
                    <CloseIcon />
                  </span>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}
