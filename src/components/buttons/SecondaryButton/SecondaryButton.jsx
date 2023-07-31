import "./SecondaryButton.scss";

export default function SecondaryButton({
  title = "Button",
  onClick,
  children,
}) {
  return (
    <button className={"secondary-button"} onClick={onClick}>
      {children}
      <span className={"secondary-button__title"}>{title}</span>
    </button>
  );
}
