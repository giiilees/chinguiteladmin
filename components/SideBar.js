import React, { useContext, useEffect, useState } from "react";
import NavItems from "../config/NavItems";
import ActiveMenu from "./activeStates/ActiveMenu";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AuthContext from "../auth/context";
import jwtDecode from "jwt-decode";

import { BsFillChatFill } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import {
  HiDotsCircleHorizontal,
  HiOutlineDotsVertical,
  HiOutlineQrcode,
} from "react-icons/hi";
import authApi from "../api/auth";
import Link from "next/link";

const mainWidth = 350;

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function SideBar({}) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const DeUser = jwtDecode(user.token);
  const [currency, setCurrency] = useState(Cookies.get("currency") || "RPU");
  const [wallet, setWallet] = useState(0);
  const [activities, setActivities] = useState([]);
  const currentUser = 50;

  return (
    <div
      className={"sm:flex hidden"}
      style={{
        height: "calc(100vh - 55px)",
        width: 65,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 65,
          paddingTop: 20,
          height: "calc(100vh - 55px)",
          backgroundColor: "#F0F2F9",
        }}
      >
        <img
          src={"/delta.png"}
          style={{
            position: "absolute",
            top: 20,
            width: 31,
            height: 31,
            objectFit: "contain",
          }}
        />

        {/* <div
          style={{
            position: "absolute",
            bottom: 0,
          }}
        >
          <ActiveMenu
            href="/menu/profile"
            name={"Menu"}
            color={"rgba(0,0,0,0.4)"}
            coloract={"#1766AF"}
            size={31}
            Icon={HiDotsCircleHorizontal}
          />
        </div> */}
      </div>
    </div>
  );
}

export default SideBar;
