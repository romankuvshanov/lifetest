import emblem from "../../../assets/images/emblem.svg";
import "./HeaderLogo.scss";

export default function HeaderLogo() {
  return (
    <div className={"header-logo"}>
      <img src={emblem} alt={"Life logo"} className={"header-logo__emblem"} />
      <p className={"header-logo__title"}>LifeTest</p>
    </div>
  );
}