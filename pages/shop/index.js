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
import cookie from "cookie";

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

function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}

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

const postNumber = 4;

function Shop({ menu, setMenu, menu1 }) {
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
    const result = await authApi.getCollections(postNumber, skip);
    if (!result.ok) {
      console.log("result");
    } else {
      setProducts(result.data);
      setBizInfo(true);
      //console.log(result.data);
    }
  };

  const submitData = async (e, item) => {
    setDisable(true);
    e.preventDefault();

    const data = await authApi.newOrder(user.token, true, item._id, "", "");
    if (!data.ok) {
      alert(data.data);
      setDisable(false);
      return;
    }
    Router.push("/services/mine");
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
        <title>Services</title>
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
          <Menu title="Payments" user={user} menu={menu} setMenu={setMenu} />
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
                {!showAdd && (
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
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 20,
                          paddingRight: 0,
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
                            Collections
                          </span>
                        </div>
                        <a
                          onClick={(e) => {
                            Router.push("/shop/collection/add");
                          }}
                          style={{
                            display: "flex",
                            height: 35,
                            borderRadius: 5,
                            width: 100,
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
                            + ajouter
                          </span>
                        </a>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        //backgroundColor: "red",
                      }}
                    >
                      {products &&
                        products.data[0] &&
                        products.data.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                "sm:w-[calc(100%*0.33-20px)] w-[calc(100%*0.5-20px)] "
                              }
                              onClick={(e) => {
                                setShowAdd(item);
                              }}
                              style={{
                                display: "flex",
                                cursor: "pointer",
                                borderRadius: 10,
                                flexDirection: "column",
                                marginRight: 20,
                                //marginBottom: 20,
                                backgroundColor: "#fff",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  flexDirection: "column",
                                  height: "100%",
                                  //backgroundColor: "#000",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <img
                                  src={item.image}
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    height: 200,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                    backgroundColor: "#000",
                                  }}
                                />
                                <div
                                  style={{
                                    display: "flex",
                                    width: "100%",
                                    padding: 10,
                                    flexDirection: "column",
                                    backgroundColor: "#fff",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontFamily: "SFP-Medium",
                                      color: "#000",
                                      fontSize: 16,
                                    }}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                              </div>
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
                )}
                {showAdd && (
                  <div
                    className={
                      !showAdd
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
                        onClick={() => {
                          setShowAdd(false);
                        }}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: 35,
                          width: 35,
                          backgroundColor: "#000",
                          borderRadius: 7,
                          marginRight: 10,
                        }}
                      >
                        <span
                          style={{
                            textAlign: "left",
                            color: "#fff",
                            fontFamily: "SFP-Medium",
                            fontSize: 22,
                          }}
                        >
                          {"<"}
                        </span>
                      </div>
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
                          {showAdd.name}
                        </span>
                      </div>
                      <a
                        onClick={(e) => {
                          Router.push(
                            "/shop/service/add?collection=" + showAdd._id
                          );
                        }}
                        style={{
                          display: "flex",
                          height: 35,
                          borderRadius: 5,
                          width: 100,
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
                          + ajouter
                        </span>
                      </a>
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
                      {showAdd &&
                        showAdd.services[0] &&
                        showAdd.services.map((item, index) => {
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
                                  //Router.push("/transactions/" + i._id);
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
                                  //backgroundColor: "rgba(0,0,30,0.05)",
                                  // marginBottom: 10,
                                  //borderRadius: 5,
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
                                    width: 150,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    marginRight: 10,
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.name}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "SFP-Regular",
                                    width: 200,
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    marginRight: 10,
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {item.price + " " + item.currency}
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
                                      " sm:flex hidden sm:w-[calc(100vw-1500px)] w-[calc(100vw-260px)]"
                                    }
                                  >
                                    {item.description}
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
                                  </div>
                                </div>
                              </div>
                              {currentProduct && currentProduct == item._id && (
                                <div
                                  className={"sm:flex-row flex-col"}
                                  style={{
                                    display: "flex",

                                    maxWidth: "100%",
                                    // backgroundColor: "red",
                                  }}
                                >
                                  <div
                                    className={"sm:w-[100%] w-[100%] "}
                                    style={{
                                      padding: 20,

                                      //backgroundColor: "green",
                                    }}
                                  >
                                    <span
                                      style={{
                                        display: "block",
                                        wordWrap: "break-word",
                                      }}
                                    >
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
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

export default Shop;

export async function getServerSideProps({ req }) {
  const cookies = parseCookies(req);

  // And then get element from cookie by name
  if (!cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }
  return { props: { cookies } };
}
