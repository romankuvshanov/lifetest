import "./Input.scss";
import { useState } from "react";

export default function Input({ placeholder = "Добавить задачу", children }) {
  const [text, setText] = useState("");

  return (
    <div className={"text-input-wrapper"}>
      {!text && children}
      <input
        className={"text-input-wrapper__input"}
        placeholder={placeholder}
        type={"text"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
