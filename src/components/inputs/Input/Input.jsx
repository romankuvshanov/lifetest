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
      <input
        className={"text-input-wrapper__input"}
        placeholder={placeholder}
        type={"text"}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {!value && children}
    </div>
  );
}
