import React, { useContext, useEffect, useState } from "react";

import Link from "next/link";
import AuthContext from "../auth/context";

import MyModal from "./MyModal";
import NavItems from "../config/NavItems";
import ActiveMenu from "../components/activeStates/ActiveMenu";
import LoginModal from "../components/authModals/LoginModal";
import { HiMenuAlt2 } from "react-icons/hi";
import jwtDecode from "jwt-decode";
import authApi from "../api/auth";
import UserMenu from "./headless/UserMenu";
import RegisterModal from "./authModals/RegisterModal";
import SendModal from "./Modals/SendModal";
import MenuMob from "./Modals/MenuMob";
import { RiSendPlaneFill } from "react-icons/ri";
import Cookies from "js-cookie";

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function HeaderApp({ hide }) {
  const { user, setUser } = useContext(AuthContext);
  const DeUser = user.token ? jwtDecode(user.token) : "";

  const [modalSendVis, setModalSendVis] = useState(false);
  const [currency, setCurrency] = useState(Cookies.get("currency") || "RPU");
  const [wallet, setWallet] = useState(0);

  const [activities, setActivities] = useState([]);
  const [modalMobVis, setModalMobVis] = useState(false);
  const [modalRegisterVis, setModalRegisterVis] = useState(false);

  const getWallet = async () => {
    const result = await authApi.getActivities(
      user.token,
      DeUser.id,
      "",
      5,
      "DESC",
      "date"
    );
    if (!result.ok) {
      console.log("error", result);
    } else {
      setActivities(result.data);
    }
    const wresult = await authApi.getWallet(user.token, DeUser.id, false);
    if (!wresult.ok) {
      console.log("error", wresult);
    } else {
      setWallet(wresult.data);
    }
  };

  const onChange = (e) => {
    Cookies.set("currency", e.target.value);
    setCurrency(e.target.value);
    location.reload();
  };

  useEffect(() => {
    getWallet();
  }, []);
  return (
    <>
      <header
        style={{
          width: "100%",
          borderBottomWidth: 1,
          position: "sticky",
          boxShadow: "0px 0px 3px 1px rgba(0,0,0,0.05)",
          top: 0,
          backgroundColor: "#fff",
          zIndex: 99999999999,
          borderColor: "rgba(0,0,0,0.1)",
          justifyContent: "flex-start",
          flexDirection: "column",
          justifyItems: "center",
        }}
        className={
          "flex flex-row items-center  justify-center border-gray-200 "
        }
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            justifyItems: "center",
            height: 60,
            paddingLeft: 30,
            paddingRight: 30,
            justifyContent: user.token ? "center" : "center",
          }}
        >
          <div
            style={{}}
            className={
              "flex flex-row h-[100%] justify-center  items-center lg:justify-center w-[100%] "
            }
          >
            {!user.token && (
              <a
                style={{ marginRight: 20, position: "absolute", left: 30 }}
                onClick={() => {
                  setModalMobVis(true);
                }}
                className={"flex lg:hidden flex-row   items-center"}
              >
                <HiMenuAlt2 color={"#000"} size={27} />
              </a>
            )}
            <Link href="/">
              <a>
                <img
                  src={"/logo.png"}
                  style={{
                    width: 40,
                    height: 60,
                    objectFit: "contain",
                  }}
                />
              </a>
            </Link>
            {user.token && (
              <div
                style={{
                  height: "100%",
                  position: "absolute",
                  left: 30,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={"lg:flex hidden "}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      height: 35,
                      marginLeft: 5,
                      marginRight: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: "rgba(0,0,0,0.05)",

                      cursor: "pointer",
                      color: "#000",
                    }}
                    onClick={() => {
                      setModalSendVis(true);
                    }}
                  >
                    Envoyer
                  </a>
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                      height: 35,
                      marginLeft: 5,
                      marginRight: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
                      backgroundColor: "rgba(0,0,0,0.05)",

                      cursor: "pointer",
                      color: "#000",
                    }}
                  >
                    Recevoir
                  </a>
                </div>
              </div>
            )}
            {user.token && (
              <div
                onClick={() => {
                  setModalSendVis(true);
                }}
                style={{
                  height: "100%",
                  position: "absolute",
                  left: 30,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={"lg:hidden flex "}
              >
                <RiSendPlaneFill size={24} color="rgba(0,0,0,0.8)" />
              </div>
            )}
            {!user.token && (
              <div
                style={{
                  height: "100%",
                  position: "absolute",
                  left: 30,
                  flex: 1,
                  fontWeight: "normal",
                  fontSize: 18,
                  color: "rgba(0,0,0,0.8)",

                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={"lg:flex hidden "}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 11,
                      height: 35,
                      marginLeft: 5,
                      marginRight: 5,
                      paddingLeft: 10,
                      paddingRight: 10,

                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setModalSendVis(true);
                    }}
                  >
                    Personnel
                  </a>
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 11,
                      height: 35,
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      cursor: "pointer",
                    }}
                  >
                    Business
                  </a>
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 11,
                      height: 35,
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      cursor: "pointer",
                    }}
                  >
                    Pourquoi nous?
                  </a>
                  <a
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 11,
                      height: 35,
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginLeft: 5,
                      marginRight: 5,
                      cursor: "pointer",
                    }}
                  >
                    Ressources
                  </a>
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                right: 30,
              }}
              className={"fixright"}
            >
              {user.token && (
                <select
                  style={{
                    borderWidth: 0,
                    borderColor: "transparent",
                    marginLeft: 10,
                    backgroundColor: "#fff",
                    fontSize: 18,
                    marginRight: 18,
                    color: "rgba(0,0,0,0.6)",
                    fontWeight: "bold",
                    lineHeight: 1.2,
                  }}
                  className={"lg:flex hidden"}
                  value={currency}
                  onChange={(e) => onChange(e)}
                >
                  <option label="RPU" value="RPU" />
                  <option label="DZD" value="DZD" />
                  <option label="EUR" value="EUR" />
                  <option label="USD" value="USD" />
                </select>
              )}

              <div
                style={{
                  display: "flex",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <UserMenu
                  loginSet={() => {
                    setModalLoginVis(true);
                  }}
                  registerSet={() => {
                    setModalRegisterVis(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {user.token && !hide && (
          <div
            style={{
              borderTopWidth: 1,
              borderColor: "rgba(0,0,0,0.05)",
              minHeight: 50,
              width: "100%",
              height: "100%",
              flexDirection: "row",
              alignItems: "center",
              paddingLeft: 30,
              paddingRight: 30,
              justifyContent: "space-between",
            }}
            className={"lg:hidden flex"}
          >
            <span
              style={{
                fontSize: 19,

                color: "rgba(0,0,0,0.6)",
                fontWeight: "normal",
                lineHeight: 1.2,
              }}
            >
              {financial(wallet[currency])}
            </span>
            <select
              style={{
                backgroundColor: "#fff",
                fontSize: 18,

                color: "rgba(0,0,0,0.6)",
                fontWeight: "bold",
                lineHeight: 1.2,
              }}
              className={"lg:hidden flex"}
              value={currency}
              onChange={(e) => onChange(e)}
            >
              <option label="RPU" value="RPU" />
              <option label="DZD" value="DZD" />
              <option label="EUR" value="EUR" />
              <option label="USD" value="USD" />
            </select>
          </div>
        )}
      </header>

      <MenuMob
        sendModal={modalMobVis}
        setSendModal={setModalMobVis}
        sendOpt={setModalSendVis}
      />
      {user.token && (
        <>
          <SendModal sendModal={modalSendVis} setSendModal={setModalSendVis} />
        </>
      )}
    </>
  );
}

export default HeaderApp;
