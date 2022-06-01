import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AuthContext from "../../../auth/context";

import authApi from "../../../api/auth";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
import MobileNav from "../../../components/MobileNav";
import PayModal from "../../../components/Modals/PayModal";
import SideBar from "../../../components/SideBar";
import { Bar, Line } from "react-chartjs-2";
import HashLoader from "react-spinners/HashLoader";
import OtherSideBar from "../../../components/OtherSideBar";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavItems from "../../../config/NavItems";
import ActiveProfile from "../../../components/activeStates/ActiveProfile";
import Menu from "../../../components/Menu";
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

function SecurityPass({ menu, setMenu }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newCpassword, setNewCPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(newPassword == newCpassword);
  const DeUser = jwtDecode(user.token);

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const updateData = async () => {
    setEditing(false);
    setDisabled(true);
    const result = await authApi.updatePassword(
      user.token,
      password,
      newPassword
    );
    if (!result.ok) {
      alert(result.data);
      setDisabled(false);
    } else {
      Router.push("/menu/profile");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMenu(false);
    }, 500);
  }, []);

  useEffect(() => {
    setEditing(
      newPassword == newCpassword &&
        newPassword != false &&
        newPassword.length > 5 &&
        newCpassword != false
    );
  }, [newPassword, newCpassword]);

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
        <title>Nouveau mot de passe</title>
      </Head>

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
          className={"sm:w-[350px] w-0   "}
          style={{
            display: "flex",
            borderColor: "rgba(0,0,0,0.1)",
            borderLeftWidth: 0.5,
            height: "calc(100vh - 55px)",
            overflowY: "auto",
          }}
        >
          <Menu
            title="Nouveau mot de passe"
            user={user}
            menu={menu}
            setMenu={setMenu}
          />
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

                marginBottom: 25,
              }}
            >
              <a
                style={{
                  color: "#2c71d1",
                  cursor: "pointer",
                  marginRight: 10,
                }}
                onClick={() => {
                  Router.back();
                }}
              >
                {"< "}
              </a>
              Nouveau mot de passe
            </span>

            <div
              style={{
                display: "flex",
                width: "100%",

                flexDirection: "column",
              }}
            >
              <a
                style={{
                  display: "flex",
                  height: 50,
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 10,
                  width: "100%",
                  backgroundColor: "#fff",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <input
                  style={{
                    display: "flex",
                    textAlign: "left",

                    fontFamily: "SFP-Medium",
                    width: "100%",
                    outline: "none",
                    borderWidth: 0,
                  }}
                  name={"Pass"}
                  value={password}
                  type={"password"}
                  placeholder={"Ancien mot de passe"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </a>
              <a
                style={{
                  display: "flex",
                  height: 50,
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 10,
                  width: "100%",
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor:
                    newPassword && newPassword.toString().length < 6
                      ? "red"
                      : "rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <input
                  style={{
                    display: "flex",
                    textAlign: "left",

                    fontFamily: "SFP-Medium",
                    flex: 1,
                    outline: "none",
                    borderWidth: 0,
                  }}
                  name={"NewPass"}
                  value={newPassword}
                  type={"password"}
                  placeholder={"Nouveau mot de passe"}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
                {newPassword && newPassword.toString().length < 6 && (
                  <span
                    style={{
                      color: "red",
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                    }}
                  >
                    {"6 Min"}
                  </span>
                )}
              </a>
              <a
                style={{
                  display: "flex",
                  height: 50,
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingRight: 10,
                  marginBottom: 10,
                  width: "100%",
                  backgroundColor: "#fff",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor:
                    newCpassword && !editing
                      ? "red"
                      : editing
                      ? "blue"
                      : "rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <input
                  style={{
                    display: "flex",
                    textAlign: "left",

                    fontFamily: "SFP-Medium",
                    width: "100%",
                    outline: "none",
                    borderWidth: 0,
                  }}
                  name={"ConfirmPass"}
                  value={newCpassword}
                  type={"password"}
                  placeholder={"Confirmer le nouveau mot de passe"}
                  onChange={(e) => {
                    setNewCPassword(e.target.value);
                  }}
                />
              </a>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                marginTop: 5,
                flexDirection: "column",
              }}
            >
              <a
                onClick={(e) => {
                  if (disabled || !editing) return;

                  updateData();
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
                    Sauvegarder
                  </span>
                )}
                {disabled && (
                  <MoonLoader color="#000" loading={true} size={12} />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityPass;
