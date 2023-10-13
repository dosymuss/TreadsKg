import React, { useRef } from "react";

function CreateInp({ placeholder, style, setText, text, limit, setLimit, setDifference }) {
  const textareaRef = useRef(null);

  const handleChange = (event) => {
    const inputText = event.target.value;
    setText(inputText);
    if (inputText.length > 280) {
      setLimit(true);
      setDifference(inputText.length - 280)
    } else {
      setLimit(false);
      setDifference(null)
    }
    adjustTextareaHeight(); // Пересчитываем высоту
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Сначала сбрасываем высоту
    textarea.style.height = `${textarea.scrollHeight}px`; // Затем устанавливаем высоту
  };

  return (
    <textarea
      className={style}
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default CreateInp;
