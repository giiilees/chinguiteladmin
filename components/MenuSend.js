import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import NavItems from "../config/NavItems";
import ActiveProfile from "./activeStates/ActiveProfile";
import authApi from "../api/auth";

function MenuSend({ title, user, menu, setMenu }) {
  const logout = async (e) => {
    e.preventDefault();

    const cookies = await authApi.clearCookie();

    window.location.href = "/";
  };
  return (
    <div
      className={" sm:w-[350px] sm:left-[65px] left-0  w-[100%] "}
      style={{
        display: "flex",
        position: "absolute",
        top: 0,
        flexDirection: "column",
        padding: 20,
        borderColor: "rgba(0,0,0,0.1)",
        borderLeftWidth: 0.5,
        height: "100vh",
        zIndex: menu ? 200 : 10,
        backgroundColor: "#fff",
        overflowY: "auto",
      }}
    >
      <div
        className={"sm:hidden flex "}
        style={{
          height: 45,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AiFillCloseCircle
          color={"rgba(0,0,0,0.45)"}
          size={24}
          style={{
            position: "absolute",
            left: 20,
            cursor: "pointer",
          }}
          onClick={() => {
            setMenu(false);
          }}
        />
        <span
          style={{
            color: "rgba(0,0,40,0.7)",
            fontFamily: "SFP-Medium",
          }}
        >
          {title}
        </span>
      </div>

      {/* ########### Menu Here ##################### */}
      <span
        style={{
          color: "rgba(0,0,40,0.8)",
          fontFamily: "SFP-SemiBold",
          fontSize: 28,
          marginLeft: 20,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        Send
      </span>

      <div
        style={{
          marginLeft: 20,
          display: "flex",
          width: "calc(100% - 40px)",
          flexDirection: "row",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              color: "rgba(0,0,40,0.7)",
              fontFamily: "SFP-Medium",
              fontSize: 17,
              lineHeight: 1,
            }}
          >
            {user.data.name}
          </span>
          <span
            style={{
              color: "rgba(0,0,40,0.5)",
              fontFamily: "SFP-Regular",
              fontSize: 15,
              lineHeight: 1,
            }}
          >
            {user.data.email}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(0,30,50,0.35)",
            height: 35,
            width: 35,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "rgba(250,250,255,0.9)",
              fontFamily: "SFP-SemiBold",
              fontSize: 15,
              margin: 5,
            }}
          >
            {user.data.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {NavItems.send.map((item, index) => (
        <ActiveProfile key={index} href={item.href} name={item.name} />
      ))}
    </div>
  );
}

export default MenuSend;
