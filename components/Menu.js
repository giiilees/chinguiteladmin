import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineLogout } from "react-icons/ai";
import NavItems from "../config/NavItems";
import ActiveProfile from "./activeStates/ActiveProfile";
import authApi from "../api/auth";
import Cookies from "js-cookie";
import AuthContext from "../auth/context";
import { useRouter } from "next/router";

function Menu({ title, user, menu, setMenu }) {
  const { business, setBusiness } = useContext(AuthContext);
  const [allbiz, setALlBiz] = useState(null);
  const Router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    const cookies = await authApi.clearCookie();
    window.location.href = "/";
  };

  return (
    <>
      <div
        className={" sm:w-[350px] sm:top-[55px] top-0  left-0  w-[100%] "}
        style={{
          display: "flex",
          position: "absolute",

          flexDirection: "column",
          padding: 20,
          //borderRightWidth: 0.5,

          borderColor: "rgba(0,0,0,0.1)",
          height: "calc(100vh - 55px)",
          zIndex: menu ? 99999 : 10,
          backgroundColor: "#fafafa",

          overflowY: "auto",
        }}
      >
        {/* ########### Menu Here ##################### */}

        {NavItems.menu.map((item, index) => (
          <ActiveProfile
            key={index}
            href={item.href}
            children={item.children ? item.children : false}
            name={item.name}
            Icon={item.icon}
            size={item.size}
          />
        ))}
      </div>
    </>
  );
}

export default Menu;
