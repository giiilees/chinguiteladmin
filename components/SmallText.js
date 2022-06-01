import React from "react";

function SmallText({ children, padding = true, heading = false, bold }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        //backgroundColor: "red",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: padding ? 20 : 0,
      }}
    >
      <span
        style={{
          fontFamily: "SFP-Regular",
          fontSize: 15,
          fontWeight: bold ? "bold" : "normal",
          color: heading ? "#0085BD" : "rgba(0,0,0,0.8)",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default SmallText;
