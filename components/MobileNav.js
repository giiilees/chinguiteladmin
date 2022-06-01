import React, { useContext, useState } from "react";
import { MdExplore, MdMap } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import ActiveLink from "./activeStates/ActiveLink";
import NavItems from "../config/NavItems";
import { HiDotsCircleHorizontal, HiMenuAlt3 } from "react-icons/hi";
import SendModal from "./Modals/SendModal";
import MenuMob from "./Modals/MenuMob";
import AuthContext from "../auth/context";

import authApi from "../api/auth";
import jwtDecode from "jwt-decode";

function MobileNav(props) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        height: 55,
        width: "100vw",
        borderColor: "rgba(0,0,0,0.1)",
        borderTopWidth: 0.5,
        backgroundColor: "#fff",
        zIndex: 99999,
      }}
      className={"sm:hidden  flex  "}
    >
      {NavItems.main.map((item, index) => (
        <ActiveLink
          key={index}
          data={user["data"]}
          href={item.href}
          Icon={item.icon}
          activeColor={"#1766AF"}
          color={"rgba(0,0,0,0.4)"}
          size={item.size}
        />
      ))}
      <ActiveLink
        href="/menu/profile"
        name={"Menu"}
        color={"rgba(0,0,0,0.4)"}
        activeColor={"#1766AF"}
        size={31}
        Icon={HiDotsCircleHorizontal}
      />
    </div>
  );
}

export default MobileNav;
