import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField";

import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import MyModal from "../../components/MyModal";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import HeaderApp from "../../components/HeaderApp";
import Link from "next/link";
import Head from "next/head";
import MoonLoader from "react-spinners/MoonLoader";
import cookie from "cookie";

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

function Login({}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [color, setColor] = useState("#000");
  const { socket } = useContext(AuthContext);

  const Router = useRouter();

  const submit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    const result = await authApi.login(username, password);

    if (!result.ok) {
      alert(result.data);
    } else {
      const token = jwtDecode(result["data"]["token"]);
      if (!token.isAdmin) {
        setDisabled(false);
        return alert("User is not an admin");
      }

      const cookies = await authApi.setCookie(
        result["data"]["token"],
        "professional"
      );
      if (Router.query.redirect) {
        window.location.href = Router.query.redirect;
      } else if (Router.query.page) {
        window.location.href = Router.query.page;
      } else {
        window.location.href = "/";
      }
    }

    setDisabled(false);
  };
  const logout = async (e) => {
    e.preventDefault();

    const cookies = await authApi.clearCookie();
    setUser({ token: "" });

    window.location.href = "/";
  };

  return (
    <div
      className={"sm:flex-row flex-col  "}
      style={{
        display: "flex",

        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Head>
        <title> Connectez-vous à Chinguitel</title>
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000",
          width: "100vw",
        }}
      >
        <div
          className={"sm:flex-row flex-col overflow-y-auto sm:overflow-hidden	 "}
          style={{
            display: "flex",
            height: "100vh",

            width: "100%",
            backgroundColor: color,
          }}
        >
          <div
            className={
              "sm:h-[100vh]  sm:w-[50vw] w-[100%]  shadow-none sm:pl-[11vw] sm:pt-[70px] sm:pb-[70px] pt-[50px]  px-[30px] pb-[60px]   "
            }
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
              backgroundColor: color,
              zIndex: 999,
              paddingTop: 120,
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 25,
                left: 30,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></div>
            <div
              className={"sm:flex hidden "}
              style={{
                position: "absolute",

                bottom: 25,
                left: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={color == "#fff" ? "/vectlogo.png" : "/vectlogo.png"}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  backgroundSize: "contain",
                }}
              />
            </div>
            <div
              className={"sm:hidden flex "}
              style={{
                position: "absolute",

                top: 25,
                right: 30,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={color == "#fff" ? "/vectlogo.png" : "/vectlogo.png"}
                style={{
                  width: 30,
                  height: 30,
                  objectFit: "contain",
                  backgroundSize: "contain",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "SFP-SemiBold",
                  fontSize: 27,
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                Chinguitel admin
              </span>
              <span
                style={{
                  width: "70%",
                  textAlign: "center",
                  fontFamily: "SFP-Regular",
                  fontSize: 17,
                  color: "#fff",
                }}
              >
                Votre compte Chinguitel admin
              </span>
            </div>
            {/* <img
              className={"sm:flex hidden"}
              src={"/frame1.png"}
              style={{
                width: 400,
                height: 250,
                objectFit: "contain",
              }}
            /> */}

            <span
              className={"sm:flex hidden"}
              style={{
                position: "absolute",
                bottom: 70,
                color: color == "#fff" ? "#000" : "#fff",
                fontFamily: "SFP-Medium",
                fontSize: 15,
              }}
            >
              Powered by Chinguitel, Copyright 2021.
            </span>
          </div>
          <div
            className={
              "sm:h-[100vh]   sm:w-[50vw] w-[100%]  sm:pr-[15vw]  p-0 "
            }
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <div
              className={
                " sm:overflow-y-auto sm:h-[90vh] min-h-[90vh] w-[100%]  rounded-t-[11px] rounded-b-[0px]   sm:pl-[5vw]   px-[5vw]   p-0 sm:pt-[70px] pt-[50px] "
              }
              style={{
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: 40,
                  borderRadius: 7,
                  width: "100%",
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <span
                  style={{
                    color: "#000",
                    fontFamily: "SFP-Medium",
                    fontSize: 15,
                  }}
                >
                  Connectez-vous à Chinguitel Admin
                </span>
              </div>
              {/* ###### Content 2 ##################### */}

              {/* ##### Divider ########### */}

              {/* ##### Fields ########### */}

              {/* ##### Pay Buttom ########### */}
              <form className={"flex  flex-col "}>
                <>
                  <InputField
                    name="username"
                    placeholder="Numéro de téléphone"
                    value={username}
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <InputField
                    name="password"
                    placeholder="Mot de passe"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <a
                    onClick={(e) => {
                      if (disabled) return;
                      submit(e);
                    }}
                    style={{
                      display: "flex",
                      height: 40,
                      borderRadius: 7,
                      width: "100%",
                      backgroundColor: "#000",
                      justifyContent: "center",
                      alignItems: "center",

                      marginBottom: 50,
                      cursor: "pointer",
                    }}
                  >
                    {!disabled && (
                      <span
                        style={{
                          color: "#fff",
                          fontFamily: "SFP-Medium",
                          fontSize: 15,
                        }}
                      >
                        Connexion
                      </span>
                    )}

                    {disabled && (
                      <MoonLoader color="#fff" loading={true} size={12} />
                    )}
                  </a>
                </>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
