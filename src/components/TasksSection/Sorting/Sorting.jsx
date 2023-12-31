import "./Sorting.scss";
import Radiobutton from "../../controls/Radiobutton/Radiobutton";
import SortingIcon from "../../icons/SortingIcon/SortingIcon";
import SecondaryButton from "../../buttons/SecondaryButton/SecondaryButton";
import CloseIcon from "../../icons/CloseIcon/CloseIcon";
import DoneIcon from "../../icons/DoneIcon/DoneIcon";
import { useState } from "react";

export default function Sorting({ currentSortingType, setCurrentSortingType }) {
  const [showSortingMenu, setShowSortingMenu] = useState(false);

  return (
    <>
      {showSortingMenu && (
        <div
          className={"sorting-overlay"}
          onClick={() => setShowSortingMenu(false)}
        ></div>
      )}
      <div className={"sorting-wrapper"}>
        <SecondaryButton
          title={"Сортировка"}
          onClick={() => setShowSortingMenu(!showSortingMenu)}
        >
          <SortingIcon />
        </SecondaryButton>
        <div className={"sorting-menu-wrapper"}>
          {showSortingMenu && (
            <div className={"sorting-menu"}>
              <p className={"sorting-menu__title"}>
                <span
                  className={"sorting-menu__icon-mobile"}
                  onClick={() => setShowSortingMenu(false)}
                >
                  <CloseIcon />
                </span>
                Сортировка
                <span
                  className={"sorting-menu__icon-mobile"}
                  onClick={() => setShowSortingMenu(false)}
                >
                  <DoneIcon />
                </span>
              </p>
              <div className={"sorting-menu__options"}>
                <label className={"sorting-menu__label"}>
                  <Radiobutton
                    name={"sorting-option"}
                    value={"BYDATE"}
                    checked={currentSortingType === "BYDATE"}
                    onChange={(event) =>
                      setCurrentSortingType(event.target.value)
                    }
                  />
                  По дате
                </label>
                <label className={"sorting-menu__label"}>
                  <Radiobutton
                    name={"sorting-option"}
                    value={"BYTIMESPENT"}
                    checked={currentSortingType === "BYTIMESPENT"}
                    onChange={(event) =>
                      setCurrentSortingType(event.target.value)
                    }
                  />
                  По затреканному времени
                </label>
                <label className={"sorting-menu__label"}>
                  <Radiobutton
                    name={"sorting-option"}
                    value={"BYSTATUS"}
                    checked={currentSortingType === "BYSTATUS"}
                    onChange={(event) =>
                      setCurrentSortingType(event.target.value)
                    }
                  />
                  По статусу
                </label>
                <label className={"sorting-menu__label"}>
                  <Radiobutton
                    name={"sorting-option"}
                    value={"BYALPHABET"}
                    checked={currentSortingType === "BYALPHABET"}
                    onChange={(event) =>
                      setCurrentSortingType(event.target.value)
                    }
                  />
                  По алфавиту
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
