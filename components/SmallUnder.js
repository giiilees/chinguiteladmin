import React from "react";

function SmallUnder({ children }) {
  return (
    <li
      style={{
        display: "flex",
        width: "100%",
        //backgroundColor: "red",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 30,
      }}
    >
      <span
        style={{
          fontFamily: "SFP-Regular",
          fontSize: 15,
          color: "rgba(0,0,0,0.8)",
        }}
      >
        {"- " + children}
      </span>
    </li>
  );
}

export default SmallUnder;
