import React from "react";

function SmallList({ children, title }) {
  return (
    <li
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
          fontFamily: "SFP-Regular",
          fontSize: 15,
          color: "rgba(0,0,0,0.8)",
        }}
      >
        <span
          style={{
            fontFamily: "SFP-Regular",
            fontSize: 15,
            marginRight: 5,
            fontWeight: "bold",
            color: "rgba(0,0,0,0.8)",
          }}
        >
          {"-"}
        </span>
        {title && (
          <span
            style={{
              fontFamily: "SFP-Regular",
              fontSize: 15,
              marginRight: 5,
              fontWeight: "bold",
              color: "rgba(0,0,0,0.8)",
            }}
          >
            {title + " : "}
          </span>
        )}
        <span
          style={{
            fontFamily: "SFP-Regular",
            fontSize: 15,
            marginRight: 5,

            color: "rgba(0,0,0,0.8)",
          }}
        >
          {children}
        </span>
      </span>
    </li>
  );
}

export default SmallList;
