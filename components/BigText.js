import React from "react";

function BigText({ children }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        //backgroundColor: "red",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "SFP-Medium",
          fontSize: 24,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default BigText;
