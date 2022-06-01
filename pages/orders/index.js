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
import InputField from "../../components/InputField";

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

const postNumber = 6;

function MineServices({ menu, setMenu, menu1 }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [page, setPage] = useState(0);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [webhook, setWebhook] = useState("");
  const [redirectSuccess, setRedirectSuccess] = useState("");
  const [redirectFail, setRedirectFail] = useState("");
  const DeUser = jwtDecode(user.token);
  const [bizInfo, setBizInfo] = useState(false);
  const [showProd, setShowProd] = useState(false);
  const [disabled, setDisable] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [products, setProducts] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);
  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const getData = async () => {
    const skip = page * postNumber;
    const result = await authApi.getOrders(user.token, postNumber, skip);
    if (!result.ok) {
      console.log(result.data);
    } else {
      // console.log(result.data);
      setProducts(result.data);
      setBizInfo(true);
    }
  };

  const confirmService = async (e, item) => {
    e.preventDefault();
    setDisable(true);
    const result = await authApi.updateOrder(user.token, item);
    if (!result.ok) {
      console.log(result.data);
    } else {
      setProducts(false);
      getData();
    }
    setDisable(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setMenu(false);
    }, 500);
    getData();
  }, [business, page]);

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
        <title>Commandes</title>
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
          <Menu title="Commandes" user={user} menu={menu} setMenu={setMenu} />
        </div>
        <div
          className={"  p-0  "}
          style={{
            flex: 1,
            height: "calc(100vh - 55px)",
            zIndex: 50,
            overflowY: "auto",
          }}
        >
          <div
            className={"sm:pl-[0px] sm:p-[20px]    rounded-0  w-[100%]  "}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "100%",

              position: "relative",
              backgroundColor: "#fafafa",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            {/* ###### Content #################### */}

            {!bizInfo && (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                }}
              >
                <MoonLoader color="#000" loading={true} size={20} />
              </div>
            )}

            {bizInfo && (
              <div
                className={"flex-col sm:flex-row"}
                style={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                }}
              >
                <div
                  className={
                    showAdd
                      ? "sm:flex sm:static absolute sm:z-0 hidden "
                      : "sm:flex sm:static absolute sm:z-0 flex z-[99999] "
                  }
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderRadius: 11,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingRight: 0,
                    paddingLeft: 30,
                  }}
                >
                  {/* Content ##### */}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                      paddingRight: 30,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          textAlign: "left",
                          color: "rgba(0,0,40,0.7)",
                          fontFamily: "SFP-Medium",
                          fontSize: 22,
                        }}
                      >
                        Commandes
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",

                      //backgroundColor: "red",
                      rowGap: 0,
                    }}
                  >
                    {products &&
                      products.data[0] &&
                      products.data.map((item, index) => {
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
                                if (!currentProduct) {
                                  setCurrentProduct(item._id);
                                } else if (
                                  currentProduct &&
                                  currentProduct == item._id
                                ) {
                                  setCurrentProduct(false);
                                } else {
                                  setCurrentProduct(item._id);
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                display: "flex",
                                width: "100%",
                                height: 55,
                                borderBottomWidth: 0.5,
                                borderBottomColor: "rgba(0,0,0,0.1)",
                                position: "relative",
                                paddingLeft: 0,
                                paddingRight: 0,
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
                                {item.isService ? "Service" : "Recharge"}
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
                                  {item.isService
                                    ? item.service.name +
                                      " " +
                                      item.service.price +
                                      " " +
                                      item.service.currency
                                    : item.amount + " " + item.currency}
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
                                      backgroundColor:
                                        item.status == "processing"
                                          ? "grey"
                                          : item.status == "cancelled"
                                          ? "red"
                                          : "green",
                                      color: "#fff",
                                      fontFamily: "SFP-Regular",
                                      fontSize: 13,
                                      padding: 3,
                                      paddingLeft: 7,
                                      paddingRight: 7,
                                      borderRadius: 5,
                                    }}
                                  >
                                    {item.status == "processing"
                                      ? "En traitement"
                                      : item.status == "cancelled"
                                      ? "Annulé"
                                      : "Actif"}
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
                            {currentProduct && currentProduct == item._id && (
                              <div
                                style={{
                                  display: "flex",

                                  maxWidth: "100%",
                                  // backgroundColor: "red",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    padding: 0,
                                    paddingTop: 20,
                                    paddingBottom: 20,
                                    width: "100%",
                                    flexDirection: "column",
                                    //backgroundColor: "green",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "SFP-Regular",
                                      fontSize: 18,
                                      display: "block",
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {"User : " + item.user.name}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "SFP-Regular",
                                      fontSize: 18,
                                      display: "block",
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {"Phone : " + item.user.phone}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "SFP-Medium",
                                      fontSize: 18,
                                      display: "block",
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {item.isService
                                      ? "Service : " + item.service.name
                                      : "Recharge :"}
                                  </span>
                                  {item.isService && (
                                    <span
                                      style={{
                                        fontFamily: "SFP-Medium",
                                        fontSize: 18,
                                        display: "block",
                                        wordWrap: "break-word",
                                      }}
                                    >
                                      {"Prix : " +
                                        item.service.price +
                                        " " +
                                        item.service.currency}
                                    </span>
                                  )}
                                  {item.isService && (
                                    <span
                                      style={{
                                        fontFamily: "SFP-Medium",
                                        fontSize: 18,
                                        display: "block",
                                        wordWrap: "break-word",
                                      }}
                                    >
                                      {"Description du service : "}
                                    </span>
                                  )}
                                  <span
                                    style={{
                                      display: "block",
                                      wordWrap: "break-word",
                                    }}
                                  >
                                    {item.isService
                                      ? item.service.description
                                      : "Recharge de : " +
                                        item.amount +
                                        " " +
                                        item.currency}
                                  </span>
                                  <a
                                    onClick={(e) => {
                                      if (disabled) return;
                                      //console.log(item);
                                      confirmService(e, item._id);
                                    }}
                                    style={{
                                      display: "flex",
                                      height: 40,
                                      borderRadius: 7,
                                      marginTop: 20,
                                      width: "100%",
                                      backgroundColor: "#000",
                                      justifyContent: "center",
                                      alignItems: "center",

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
                                        {item.status == "complete"
                                          ? "Annuler"
                                          : "Confirmer"}
                                      </span>
                                    )}

                                    {disabled && (
                                      <MoonLoader
                                        color="#fff"
                                        loading={true}
                                        size={12}
                                      />
                                    )}
                                  </a>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                    {products && products.data[0] && (
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          marginTop: 10,
                          flexDirection: "row",
                          //marginTop: 15,
                        }}
                      >
                        {page == 0 || !products ? null : (
                          <div
                            style={{
                              width: "100%",
                            }}
                          >
                            <a
                              onClick={() => {
                                if (page == 0 || !products) {
                                  return;
                                }
                                setPage(page - 1);
                              }}
                              style={{
                                display: "flex",
                                height: 45,
                                flex: 1,
                                cursor:
                                  page == 0 || !products
                                    ? "not-allowed"
                                    : "pointer",
                                // backgroundColor:
                                //   page == 0 || !products ? "rgba(0,0,0,0.1)" : "#000",
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

                        {!products ||
                        (page + 1) * postNumber >= products.count ? null : (
                          <div
                            style={{
                              width: "100%",
                            }}
                          >
                            <a
                              onClick={() => {
                                if (
                                  !products ||
                                  (page + 1) * postNumber >= products.count
                                ) {
                                  return;
                                }
                                setPage(page + 1);
                              }}
                              style={{
                                cursor:
                                  !products ||
                                  (page + 1) * postNumber >= products.count
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MineServices;
