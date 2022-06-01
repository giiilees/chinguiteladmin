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

function Security({ menu, setMenu }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [name, setName] = useState(user.data.name);
  const [disabled, setDisabled] = useState(false);

  const [page, setPage] = useState(0);
  const [editing, setEditing] = useState(false);
  const DeUser = jwtDecode(user.token);

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const logout = async (e) => {
    e.preventDefault();
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
        <title>Sécurité</title>
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
          <Menu title="Sécurité" user={user} menu={menu} setMenu={setMenu} />
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

                marginBottom: 20,
              }}
            >
              Sécurité
            </span>

            <div
              style={{
                display: "flex",
                width: "100%",

                flexDirection: "column",
              }}
            >
              <a
                onClick={(e) => {
                  Router.push("/menu/security/password");
                }}
                style={{
                  display: "flex",
                  height: 50,
                  borderRadius: 5,
                  paddingLeft: 10,
                  paddingRight: 20,
                  width: "100%",
                  backgroundColor: "#fff",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 0.5,
                  borderColor: "rgba(0,0,0,0.1)",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "rgba(0,0,40,0.8)",
                    fontFamily: "SFP-Regular",
                    fontSize: 15,
                  }}
                >
                  {"Changer le mot de passe"}
                </span>
                <span
                  style={{
                    color: "rgba(0,0,40,0.8)",
                    fontFamily: "SFP-Medium",
                    fontSize: 18,
                  }}
                >
                  {">"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Security;
