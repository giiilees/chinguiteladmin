import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AuthContext from "../auth/context";

import authApi from "../api/auth";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
import MobileNav from "../components/MobileNav";
import PayModal from "../components/Modals/PayModal";
import SideBar from "../components/SideBar";
import { Bar, Line } from "react-chartjs-2";
import HashLoader from "react-spinners/HashLoader";
import OtherSideBar from "../components/OtherSideBar";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavItems from "../config/NavItems";
import ActiveProfile from "../components/activeStates/ActiveProfile";
import Menu from "../components/Menu";
import MoonLoader from "react-spinners/MoonLoader";
import InputField from "../components/InputField";
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

const postNumber = 6;

function Home({ menu, setMenu, menu1 }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const [payments, setPayments] = useState(null);
  const [page, setPage] = useState(0);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("N-UM");
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
  const [step, setStep] = useState(0);

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

  const submitData = async (e) => {
    setDisable(true);
    e.preventDefault();
    if (!price) return alert("Veuillez entrer le montant");

    const data = await authApi.newOrder(
      user.token,
      false,
      null,
      price,
      currency
    );
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
        <title>Accueil</title>
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
          <Menu title="Accueil" user={user} menu={menu} setMenu={setMenu} />
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
                        flexDirection: "column",
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
                          Accueil
                        </span>
                      </div>
                    </div>
                    <div
                      className={"sm:pr-[20%] sm:pl-[17%] pr-[35px] pl-[10px]"}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",

                        //backgroundColor: "red",
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
                        Bienvenue sur le tableau de bord Chinguitel
                      </span>
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

export default Home;

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
