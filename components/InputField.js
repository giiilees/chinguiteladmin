import React from "react";

function InputField({ name, onChange, value, type, placeholder }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 0.5,
        borderRadius: 7,
        borderColor: "rgba(0,0,0,0.1)",
      }}
      className={"flex  h-[45px]   mb-[15px] "}
    >
      <input
        className={
          "flex-1 p-[10px] focus:border-[1px] border-blue-400  outline-none bg-transparent border-0 "
        }
        style={{
          borderRadius: 7,
        }}
        name={name}
        value={value}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
