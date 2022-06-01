import { useEffect, useState } from "react";

import "../styles/globals.css";
import AuthContext from "../auth/context";

import Modal from "react-modal";
import Head from "next/head";
import authApi from "../api/auth";
import LoadingModal from "../components/authModals/LoadingModal";
import { useRouter } from "next/router";

import { io } from "socket.io-client";

import NavItems from "../config/NavItems";
import { CgClose, CgMathEqual } from "react-icons/cg";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("");
  const [business, setBusiness] = useState(null);
  const [menu, setMenu] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const Router = useRouter();
  const CurrentPath = Router.asPath;
  const customProps = {
    ...pageProps,
    menu,
    setMenu,
    menu1,
    setMenu1,
  };
  const options = [
    "/",
    "/activities",
    "/transactions",
    "/profile",
    "/menu",
    "/menu/profile",
    "/menu/security",
    "/menu/security/password",
    "/shop",
    "/shop/collection/add",
    "/shop/service/add",
    "/shop/recharge",
    "/services/mine",
    "/payments",
    "/profile/account",
    "/profile/security",
    "/settings",
    "/transactions/send",
    "/transactions/request",
  ];

  const request = async () => {
    const request = await authApi.getCookie();
    if (!request.data.token && options.indexOf(CurrentPath) > -1) {
      window.location.href = "/auth/login?page=" + CurrentPath;
    } else {
      if (request.data.token) {
        const result = await authApi.validateToken(request.data.token);
        if (!result.ok) {
          console.log(result.data);
        } else {
          setUser({
            token: result.data.token,
            data: result.data.user,
          });
        }
      }
    }
    setIsLoaded(true);
  };

  let socket = useSocket("http://192.168.42.124:6700");

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    setMenu1(false);
  }, [Router.asPath]);

  if (!isLoaded)
    return (
      <>
        <Head>
          <link rel="icon" href="/chingbrowser.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <div
          style={{
            display: "flex",
            width: "100vw",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <LoadingModal />
        </div>
      </>
    );

  return (
    <>
      <Head>
        <link rel="icon" href="/chingbrowser.png" />
      </Head>
      <div
        style={{
          display: "flex",
          width: "100vw",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {isLoaded && (
          <AuthContext.Provider
            value={{ user, setUser, socket, business, setBusiness }}
          >
            <div
              style={{
                display: "flex",
                width: "100vw",

                flexDirection: "row",
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  width: "100%",
                  height: "100%",
                }}
              >
                {user && ["/auth/login"].indexOf(CurrentPath) <= -1 && (
                  <div
                    className={
                      " sm:pt-[15px] bg-[#fff] sm:bg-[#fafafa] border-b-0 sm:border-t-0 border-t-[1px] sm:justify-start  sm:static fixed  sm:top-0 bottom-0"
                    }
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      height: 55,

                      zIndex: 99999999,
                      alignItems: "center",
                      justifyContent: "flex-start",
                      borderColor: "rgba(0,0,0,0.1)",
                      width: "100%",
                      //backgroundColor: "#000",
                    }}
                  >
                    {user && (
                      <div
                        className={"sm:hidden flex"}
                        style={{
                          marginRight: "31%",
                          width: "100%",
                          height: "100%",
                          // backgroundColor: "red",
                        }}
                      >
                        {NavItems.menu.map((item, index) => {
                          if (index < 3) {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  Router.push(item.href);
                                }}
                                style={{
                                  display: "flex",
                                  flex: 1,
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <item.icon
                                  color={(function () {
                                    const splited = Router.asPath.split("/");
                                    const splitedHref = item.href?.split("/");

                                    let isCurrentPath =
                                      "/" + splited[1] === "/" + splitedHref[1];

                                    return isCurrentPath ? "#2c71d1" : "#000";
                                  })()}
                                  size={item.size}
                                />
                              </div>
                            );
                          } else {
                            return null;
                          }
                        })}
                        <div
                          style={{
                            display: "flex",
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {user ? (
                            !menu ? (
                              <CgMathEqual
                                className={"sm:hidden flex"}
                                style={{}}
                                color="#000"
                                size={30}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMenu(!menu);
                                }}
                              />
                            ) : (
                              <CgClose
                                className={"sm:hidden flex"}
                                style={{}}
                                color="#2c71d1"
                                size={27}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setMenu(!menu);
                                }}
                              />
                            )
                          ) : null}
                        </div>
                      </div>
                    )}

                    <div
                      className={"sm:flex hidden"}
                      onClick={() => {
                        Router.push("/");
                      }}
                      style={{
                        position: "absolute",
                        left: 30,
                        cursor: "pointer",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={"/logodark.png"}
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "contain",
                          backgroundSize: "contain",
                        }}
                      />
                    </div>
                    {user && (
                      <div
                        className={"sm:right-[20px] right-[20px]"}
                        onClick={() => {
                          Router.push("/menu/profile");
                        }}
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          position: "absolute",
                          backgroundColor: (function () {
                            const href = "/menu/profile";
                            const splited = Router.asPath.split("/");
                            const splitedHref = href?.split("/");

                            let isCurrentPath =
                              "/" + splited[1] === "/" + splitedHref[1];

                            return isCurrentPath ? "#2c71d1" : "#000";
                          })(),
                          flexDirection: "row",
                          padding: 5,
                          paddingRight: 10,
                          borderRadius: 1000,
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className={"sm:mr-[10px]"}
                          style={{
                            width: 25,
                            backgroundColor: "#fff",
                            // boxShadow: "0px 0px 5px 1px #dcdee6",
                            borderRadius: 1000,

                            height: 25,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
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
                        <div
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <span
                            className={"sm:flex hidden"}
                            style={{
                              color: "rgba(255,255,255,1)",
                              fontFamily: "SFP-Medium",
                              fontSize: 17,
                              lineHeight: 1,
                            }}
                          >
                            {user.data.name}
                          </span>
                          <span
                            className={"sm:hidden flex"}
                            style={{
                              color: "rgba(255,255,255,1)",
                              fontFamily: "SFP-Medium",

                              marginLeft: 5,
                            }}
                          >
                            {"Compte"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div
                  style={{
                    flex: 1,
                    height: "calc(100vh - 55px)",

                    overflow: "hidden",
                    overflowY: "hidden",
                    width: "100vw",
                    flexDirection: "column",
                  }}
                >
                  <Component {...customProps} />
                </div>
              </div>
            </div>
          </AuthContext.Provider>
        )}
      </div>
    </>
  );
}

export default MyApp;

function useSocket(url) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(url, {
      transports: ["websocket"],
    });

    socketIo.on("MineRequest", async ({ defficulty, block }) => {
      //console.log("Mine Received");
      // alert("Block sent");
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }
    return cleanup;

    // should only run once and not on every re-render,
    // so pass an empty array
  }, []);

  return socket;
}
