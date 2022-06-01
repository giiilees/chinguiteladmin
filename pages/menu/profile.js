import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AuthContext from "../../auth/context";

import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
import MobileNav from "../../components/MobileNav";
import PayModal from "../../components/Modals/PayModal";
import SideBar from "../../components/SideBar";
import { Bar, Line } from "react-chartjs-2";
import HashLoader from "react-spinners/HashLoader";
import OtherSideBar from "../../components/OtherSideBar";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavItems from "../../config/NavItems";
import ActiveProfile from "../../components/activeStates/ActiveProfile";
import Menu from "../../components/Menu";
import MoonLoader from "react-spinners/MoonLoader";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function reverseArray(array) {
  return array ? array.reverse() : false;
}

function dateFormat(time) {
  let date = new Date(time * 1000);
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    ", " +
    date.getFullYear().toString().substr(-2)
  );
}

function Profile({ menu, setMenu }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [name, setName] = useState(user.data.name || "");
  const [disabled, setDisabled] = useState(false);

  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(false);
  const DeUser = user ? jwtDecode(user.token) : false;

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const logout = async (e) => {
    e.preventDefault();
    Cookies.remove("business");
    const cookies = await authApi.clearCookie();
    window.location.href = "/";
  };

  const updateData = async () => {
    setDisabled(true);
    const result = await authApi.updateUser(user.token, name);
    if (!result.ok) {
      console.log(result);
      setDisabled(false);
    } else {
      location.reload();
    }
  };

  useEffect(() => {
    //console.log(user.data);
    setTimeout(() => {
      setMenu(false);
    }, 500);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "calc(100vh - 55px)",
        flexDirection: "row",
        backgroundColor: "#fafafa",
      }}
    >
      <Head>
        <title>Profile</title>
      </Head>

      {user.token && (
        <div
          className={"w-[100%] "}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",

            height: "calc(100vh - 55px)",
          }}
        >
          <div
            className={"sm:w-[350px] w-0 "}
            style={{
              display: "flex",
              borderColor: "rgba(0,0,0,0.1)",
              borderLeftWidth: 0.5,
              height: "calc(100vh - 55px)",
              overflowY: "auto",
            }}
          >
            <Menu title="Profile" user={user} menu={menu} setMenu={setMenu} />
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,

              height: "100%",
              zIndex: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            className={" sm:pt-[30px] sm:pb-[30px] py-0  "}
          >
            <div
              className={" rounded-[5px] sm:w-[410px]  w-[100%]  "}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                position: "relative",
                height: "100%",
                backgroundColor: "#fff",
                overflowY: "auto",
                padding: 20,
              }}
            >
              {/* ###### Content #################### */}

              <span
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "rgba(0,0,40,0.7)",
                  fontFamily: "SFP-Medium",
                  fontSize: 19,

                  marginBottom: 10,
                }}
              >
                Profile
              </span>
              <div>
                <div
                  style={{
                    display: "flex",
                    marginTop: 30,
                    width: 90,
                    height: 90,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 1000,
                    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.1)",
                    borderWidth: 0.5,
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={
                      "https://avatars.dicebear.com/api/initials/" +
                      user.data.name +
                      ".svg"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 1000,
                      objectFit: "contain",
                      backgroundSize: "contain",
                    }}
                  />
                </div>
              </div>

              {!editing && (
                <div
                  className={"sm:w-[100%] w-[100%] "}
                  style={{
                    display: "flex",
                    marginTop: 70,
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(0,0,40,0.5)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      Nom
                    </span>
                    <span
                      style={{
                        color: "rgba(0,0,40,0.7)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      {user.data.name}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(0,0,40,0.5)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      Numero
                    </span>
                    <span
                      style={{
                        color: "rgba(0,0,40,0.7)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      {user.data.phone}
                    </span>
                  </div>
                </div>
              )}
              {editing && (
                <div
                  className={"sm:w-[100%] w-[100%] "}
                  style={{
                    display: "flex",
                    marginTop: 70,
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(0,0,40,0.5)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      Nom
                    </span>
                    <input
                      style={{
                        display: "flex",
                        textAlign: "right",
                        marginBottom: 10,
                        fontFamily: "SFP-Medium",

                        outline: "none",
                        borderWidth: 0,
                      }}
                      name={"Name"}
                      value={name}
                      type={"text"}
                      placeholder={user.data.name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(0,0,40,0.5)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      Numero
                    </span>
                    <span
                      style={{
                        color: "rgba(0,0,40,0.5)",
                        fontFamily: "SFP-Medium",

                        marginBottom: 10,
                      }}
                    >
                      {user.data.phone}
                    </span>
                  </div>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: 50,
                  flexDirection: "column",
                }}
              >
                <a
                  onClick={(e) => {
                    if (disabled) return;
                    if (editing) {
                      updateData();
                    } else {
                      setEditing(true);
                    }
                  }}
                  style={{
                    display: "flex",
                    height: 35,
                    borderRadius: 5,
                    width: "100%",
                    backgroundColor: disabled
                      ? "rgba(0,0,0,0.1)"
                      : editing
                      ? "#2c71d1"
                      : "rgba(0,0,0,0.1)",
                    justifyContent: "center",
                    alignItems: "center",

                    cursor: "pointer",
                  }}
                >
                  {!disabled && (
                    <span
                      style={{
                        color: editing ? "#fff" : "#000",
                        fontFamily: "SFP-Medium",
                        fontSize: 15,
                      }}
                    >
                      {editing ? "Sauvegarder" : "Modifier"}
                    </span>
                  )}
                  {disabled && (
                    <MoonLoader color="#000" loading={true} size={12} />
                  )}
                </a>
                {editing && !disabled && (
                  <a
                    onClick={(e) => {
                      setEditing(false);
                    }}
                    style={{
                      display: "flex",
                      height: 35,
                      borderRadius: 5,
                      marginTop: 10,
                      width: "100%",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      justifyContent: "center",
                      alignItems: "center",

                      cursor: "pointer",
                    }}
                  >
                    {!disabled && (
                      <span
                        style={{
                          color: "#000",
                          fontFamily: "SFP-Medium",
                          fontSize: 15,
                        }}
                      >
                        Annuler
                      </span>
                    )}
                    {disabled && (
                      <MoonLoader color="#000" loading={true} size={12} />
                    )}
                  </a>
                )}
                <a
                  onClick={(e) => {
                    logout(e);
                  }}
                  style={{
                    display: "flex",
                    height: 35,
                    marginTop: 10,
                    borderRadius: 5,
                    width: "100%",
                    backgroundColor: "#2c71d1",

                    justifyContent: "center",
                    alignItems: "center",

                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      color: "#fff",
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                    }}
                  >
                    Se déconnecter
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
