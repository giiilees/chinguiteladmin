import React from "react";

function SmallPhoto({ src, padding = true, height, contain }) {
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
      <img
        src={src}
        style={{
          width: "100%",
          height: height ? height : false,
          objectFit: contain ? "contain" : "cover",
          borderRadius: 7,
        }}
      />
    </div>
  );
}

export default SmallPhoto;
