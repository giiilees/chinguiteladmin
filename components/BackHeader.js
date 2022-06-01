import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";

function BackHeader({ title }) {
  const Router = useRouter();
  return (
    <div
      className={"lg:px-[200px] md:px-[100px] px-[25px] "}
      style={{
        display: "flex",
        width: "100%",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 99999,
        backgroundColor: "#fff",
        boxShadow: "0px 0px 20px 1px rgba(0,0,0,0.1)",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <BiArrowBack
        onClick={() => {
          Router.back();
        }}
        color="rgba(0,0,0,0.8)"
        size="24"
      />
      <span style={{ fontSize: 19, marginLeft: 10, fontWeight: "normal" }}>
        {title}
      </span>
    </div>
  );
}

export default BackHeader;
