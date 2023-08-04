import "./Input.scss";

export default function Input({
  placeholder = "Добавить задачу",
  value,
  onKeyDown,
  onChange,
  children,
}) {
  return (
    <div className={"text-input-wrapper"}>
      <span className={"text-input-wrapper__placeholder"}>
        {children}
        {placeholder}
      </span>
      <input
        className={"text-input-wrapper__input"}
        type={"text"}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
