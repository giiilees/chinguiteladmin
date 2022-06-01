import React, { useContext, useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineLogout } from "react-icons/ai";
import NavItems from "../config/NavItems";
import ActiveProfile from "./activeStates/ActiveProfile";
import authApi from "../api/auth";
import Cookies from "js-cookie";
import AuthContext from "../auth/context";
import { useRouter } from "next/router";
import ActiveProfile1 from "./activeStates/ActiveProfile1";

function Menu1({ title, user, menu, setMenu }) {
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
      {menu && (
        <div
          className={
            "sm:hidden flex sm:w-[350px] sm:top-[55px] top-[75px] left-0  w-[100%] "
          }
          style={{
            position: "absolute",

            flexDirection: "column",
            padding: 20,
            //borderRightWidth: 0.5,

            borderColor: "rgba(0,0,0,0.1)",
            height: "calc(100vh - 75px)",
            zIndex: menu ? 99999 : 10,
            backgroundColor: "#fafafa",

            overflowY: "auto",
          }}
        >
          {/* ########### Menu Here ##################### */}

          {NavItems.main.map((item, index) => (
            <ActiveProfile1
              key={index}
              href={item.href}
              children={item.children ? item.children : false}
              name={item.name}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Menu1;
