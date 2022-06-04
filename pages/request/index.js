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
  let date = new Date(time);
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    ", " +
    date.getFullYear().toString().substr(-2)
  );
}

const postNumber = 7;

function Payments({ menu, setMenu }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [page, setPage] = useState(0);
  const DeUser = jwtDecode(user.token);

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const getData = async () => {
    setPayments(false);
    const skip = page * postNumber;
    const result = await authApi.getContacts(user.token, postNumber, skip);

    if (!result.ok) {
      alert(result.data);
    } else {
      setPayments(result.data);
      console.log(result.data);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMenu(false);
    }, 500);

    getData();
  }, [business, page]);

  useEffect(() => {
    socket.on("GateEvent", (msg) => {
      getData();
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        //backgroundColor: "#F0F2F9",
      }}
    >
      <Head>
        <title>Demandes des clients</title>
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
            title="Demandes des clients"
            user={user}
            menu={menu}
            setMenu={setMenu}
          />
        </div>
        <div
          className={"  p-0  w-[100%]"}
          style={{
            flex: 1,
            height: "calc(100vh - 55px)",
            zIndex: 50,
            // overflowY: "auto",
            backgroundColor: "#fafafa",
          }}
        >
          <div
            className={
              " sm:p-[20px] p-[15px] pt-[20px] sm:mt-[20px] mt-[0px]  rounded-0  w-[100%]  "
            }
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",
              position: "relative",
              backgroundColor: "#fff",
              overflowX: "hidden",

              overflowY: "auto",
              borderTopLeftRadius: 10,
            }}
          >
            {/* ###### Content #################### */}

            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "rgba(0,0,40,0.7)",
                  fontFamily: "SFP-Medium",
                  fontSize: 22,

                  marginLeft: 10,
                }}
              >
                Demandes des clients
              </span>
            </div>

            {payments && !payments.data[0] && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(0,0,40,0.7)",
                    fontFamily: "SFP-Medium",
                    width: 100,
                  }}
                >
                  Pas de demandes
                </span>
              </div>
            )}

            {payments && !payments.data[0] ? null : (
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    width: "100%",
                    height: 45,
                    position: "relative",
                    borderRadius: 7,
                    paddingLeft: 10,
                    paddingRight: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(0,0,40,0.7)",
                      fontFamily: "SFP-Regular",
                      width: 150,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginRight: 10,
                      textOverflow: "ellipsis",
                    }}
                  >
                    Amount
                  </span>
                  <span
                    style={{
                      color: "rgba(0,0,40,0.7)",
                      fontFamily: "SFP-Regular",
                      width: 200,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      marginRight: 10,
                      textOverflow: "ellipsis",
                    }}
                  >
                    Status
                  </span>
                  <div
                    className={"sm:justify-between justify-end"}
                    style={{
                      display: "flex",
                      width: " 100%",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "rgba(0,0,40,0.7)",
                        fontFamily: "SFP-Regular",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      className={
                        " sm:flex hidden sm:w-[calc(100vw-790px)] w-[calc(100vw-260px)]"
                      }
                    >
                      Description
                    </span>
                    <div
                      className={"sm:justify-between justify-end"}
                      style={{
                        display: "flex",
                        position: "absolute",
                        right: 15,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          marginLeft: 20,
                          color: "rgba(0,0,40,0.7)",
                          fontFamily: "SFP-Regular",
                        }}
                        className={" sm:hidden flex "}
                      >
                        Brand
                      </span>
                      <span
                        className={" sm:flex hidden "}
                        style={{
                          marginLeft: 20,
                          color: "rgba(0,0,40,0.7)",
                          fontFamily: "SFP-Regular",
                        }}
                      >
                        Date
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {payments &&
              payments.data[0] &&
              payments.data.map((i, index) => {
                let item = i;
                return (
                  <div
                    key={index}
                    style={{
                      width: "calc(100% - 32px)",
                      flexDirection: "column",
                      display: "flex",
                    }}
                  >
                    <div
                      onClick={() => {
                        Router.push("/request/" + i._id);
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        width: "100%",
                        height: 55,
                        borderBottomWidth: 0.5,
                        borderBottomColor: "rgba(0,0,0,0.1)",
                        //backgroundColor: "rgba(0,0,30,0.05)",
                        // marginBottom: 10,
                        //borderRadius: 5,
                        position: "relative",
                        paddingLeft: 10,
                        paddingRight: 10,
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(0,0,40,0.7)",
                          fontFamily: "SFP-Regular",
                          width: 100,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.subject}
                      </span>

                      <div
                        className={"sm:justify-between "}
                        style={{
                          display: "flex",
                          width: " 100%",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "rgba(0,0,40,0.7)",
                            fontFamily: "SFP-Regular",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                          className={
                            " sm:flex  sm:w-[calc(100vw-900px)] w-[calc(100vw-250px)]"
                          }
                        >
                          {item.email}
                        </span>
                        <div
                          className={"sm:justify-between justify-end"}
                          style={{
                            display: "flex",
                            position: "absolute",
                            right: 0,
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              fontFamily: "SFP-Regular",
                              fontSize: 13,
                              padding: 3,
                              paddingLeft: 7,
                              paddingRight: 7,
                              borderRadius: 5,
                            }}
                          >
                            {">"}
                          </span>
                          <span
                            className={" sm:flex hidden "}
                            style={{
                              minWidth: 80,
                              marginLeft: 20,
                              color: "rgba(0,0,40,0.7)",
                              fontFamily: "SFP-Regular",
                            }}
                          >
                            {dateFormat(item.created)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {!payments &&
              [...Array(postNumber)].map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() => {
                      Router.push("/payments/" + item._id);
                    }}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      width: "100%",
                      height: 55,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "rgba(0,0,0,0.1)",
                      //backgroundColor: "rgba(0,0,30,0.05)",
                      // marginBottom: 10,
                      //borderRadius: 5,
                      position: "relative",
                      paddingLeft: 10,
                      paddingRight: 10,
                      alignItems: "center",
                      justifyContent: "space-between",
                      //backgroundColor: "red",
                    }}
                  >
                    <div
                      className={"animate-pulse "}
                      style={{
                        width: 120,
                        height: 30,
                        borderRadius: 5,
                        marginRight: 10,
                        backgroundColor: "rgba(0,0,0,0.1)",
                      }}
                    ></div>

                    <div
                      className={"animate-pulse "}
                      style={{
                        width: 200,
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: "rgba(0,0,0,0.1)",

                        marginRight: 10,
                      }}
                    ></div>
                    <div
                      className={"sm:justify-between justify-end"}
                      style={{
                        display: "flex",
                        width: " 100%",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={
                          "animate-pulse sm:flex hidden sm:w-[calc(100vw-850px)] w-[calc(100vw-260px)]"
                        }
                        style={{
                          width: 250,
                          height: 30,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                        }}
                      ></div>
                      <div
                        className={"sm:justify-between justify-end"}
                        style={{
                          display: "flex",
                          position: "absolute",
                          right: 15,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <div
                          className={"animate-pulse "}
                          style={{
                            width: 50,
                            height: 30,
                            borderRadius: 5,
                            backgroundColor: "rgba(0,0,0,0.1)",
                          }}
                        ></div>
                        <div
                          className={" sm:flex hidden animate-pulse  "}
                          style={{
                            width: 100,
                            height: 30,
                            borderRadius: 5,
                            backgroundColor: "rgba(0,0,0,0.1)",

                            marginLeft: 20,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {payments && payments.data[0] && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  marginTop: 10,
                  flexDirection: "row",
                  //marginTop: 15,
                }}
              >
                {page == 0 || !payments ? null : (
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <a
                      onClick={() => {
                        if (page == 0 || !payments) {
                          return;
                        }
                        setPage(page - 1);
                      }}
                      style={{
                        display: "flex",
                        height: 45,
                        flex: 1,
                        cursor:
                          page == 0 || !payments ? "not-allowed" : "pointer",
                        // backgroundColor:
                        //   page == 0 || !payments ? "rgba(0,0,0,0.1)" : "#000",
                        // backgroundColor: "rgba(0,0,0,0.1)",
                        // borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          color: "#2c71d1",
                        }}
                      >
                        {"< Previous"}
                      </span>
                    </a>
                  </div>
                )}

                {!payments ||
                (page + 1) * postNumber >= payments.count ? null : (
                  <div
                    style={{
                      width: "100%",
                    }}
                  >
                    <a
                      onClick={() => {
                        if (
                          !payments ||
                          (page + 1) * postNumber >= payments.count
                        ) {
                          return;
                        }
                        setPage(page + 1);
                      }}
                      style={{
                        cursor:
                          !payments || (page + 1) * postNumber >= payments.count
                            ? "not-allowed"
                            : "pointer",
                        // backgroundColor:
                        //   !payments || (page + 1) * postNumber >= payments.count
                        //     ? "rgba(0,0,0,0.1)"
                        //     : "#000",
                        display: "flex",
                        height: 45,
                        flex: 1,

                        //borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          color: "#2c71d1",
                        }}
                      >
                        {"Next >"}
                      </span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
