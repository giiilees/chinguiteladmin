import React, { useContext, useEffect, useState } from "react";
import InputField from "../InputField";

import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import MyModal from "../MyModal";
import Router from "next/router";
import jwtDecode from "jwt-decode";
import HeaderApp from "../HeaderApp";
import Link from "next/link";
import Head from "next/head";
import SideModal from "../SideModal";
import { FiChevronRight } from "react-icons/fi";

function MenuMob({ sendModal, setSendModal, sendOpt }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const result = await authApi.login(username, password);

    if (!result.ok) {
      console.log("failed", result);
    } else {
      const token = jwtDecode(result["data"]["data"]["token"]);
      if (token["data"]["user"]["isActive"]) {
        const cookies = await authApi.setCookie(
          result["data"]["data"]["token"]
        );

        window.location.href = "/";
      } else {
        alert("Account not active");
      }
    }
  };
  const logout = async (e) => {
    e.preventDefault();

    const cookies = await authApi.clearCookie();
    setUser({ token: "" });

    window.location.href = "/";
  };
  return (
    <span>
      <SideModal title={"Menu"} modalVis={sendModal} setModalVis={setSendModal}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          {user.token && (
            <div
              style={{
                flex: 1,
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <a
                style={{
                  display: "flex",
                  padding: 30,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "#000",
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.05)",
                }}
                onClick={() => {
                  setSendModal(false);
                  sendOpt(true);
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(0,0,0,0.8)",
                    fontWeight: "normal",
                  }}
                >
                  Envoyer de l'argent
                </span>
                <FiChevronRight size={26} color="rgba(0,0,0,0.7)" />
              </a>
              <a
                style={{
                  display: "flex",
                  padding: 30,
                  paddingTop: 20,
                  paddingBottom: 20,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  cursor: "pointer",
                  color: "#000",
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.05)",
                }}
                onClick={() => {
                  setSendModal(false);
                  sendOpt(true);
                }}
              >
                <span
                  style={{
                    fontSize: 18,
                    color: "rgba(0,0,0,0.8)",
                    fontWeight: "normal",
                  }}
                >
                  Recevoir de l'argent
                </span>
                <FiChevronRight size={26} color="rgba(0,0,0,0.7)" />
              </a>
            </div>
          )}
          {!user.token && (
            <div
              style={{
                flex: 1,
                display: "flex",
                width: "100%",
                flexDirection: "column",
                padding: 30,
              }}
            >
              <a
                style={{
                  padding: 15,
                  backgroundColor: "rgba(0,0,0,0.03)",
                  borderRadius: 7,
                  cursor: "pointer",
                  color: "#000",
                }}
                onClick={() => {
                  Router.push("/about");
                }}
              >
                <span>About</span>
              </a>
            </div>
          )}
          <div
            style={{
              width: "100%",

              position: "static",
              bottom: 0,
              padding: 30,
            }}
          >
            <a
              onClick={(e) => submit(e)}
              style={{
                cursor: "pointer",
                display: "flex",
                flex: 1,
                height: 45,
                borderRadius: 8,
                backgroundColor: "blue",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                }}
              >
                Contactez nous
              </span>
            </a>
          </div>
        </div>
      </SideModal>
    </span>
  );
}

export default MenuMob;
