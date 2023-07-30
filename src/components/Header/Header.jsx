import emblem from "../../assets/images/emblem.svg";
import PauseIcon from "../icons/PauseIcon/PauseIcon";
import './Header.scss';

export default function Header() {
  return (
    <header className={'header'}>
      <div className={"header__logo"}>
        <img src={emblem} alt={"Life logo"} className={"header__emblem"} />
        <p className={"header__title"}>LifeTest</p>
      </div>
      <div className={'header__task-time-wrapper'}>
          <div className={'header__task'}>
              <p>Сделать UI-kit</p>
              <PauseIcon className={'header__pause-icon'} />
          </div>
          <div className={'header__time'}>
              <p>Сегодня <span className={'header__time-title'}>0:20:42</span></p>
          </div>
      </div>
    </header>
  );
}
