import "./Radiobutton.scss";

export default function Radiobutton({ name, value, checked, onChange }) {
  return (
    <input
      type={"radio"}
      className={"radiobutton"}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
    ></input>
  );
}
