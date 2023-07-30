import pause from "../../../assets/icons/pause.svg";
import './PauseIcon.scss';

export default function PauseIcon(props) {
  return <img src={pause} alt={"Pause icon"} {...props} />;
}