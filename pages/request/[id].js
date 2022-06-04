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

function PaymentsIDs({ menu, setMenu }) {
  const Router = useRouter();
  const ID = Router.query.id;
  const { user, setUser } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const [payment, setPayment] = useState(false);
  const [transaction, setTransaction] = useState(false);
  const DeUser = jwtDecode(user.token);
  const [disabled, setDisable] = useState(false);

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const getData = async () => {
    const result = await authApi.getContact(user.token, ID);
    if (!result.ok) {
      alert(result.data);
    } else {
      setTransaction(result.data);
      console.log(result.data);
      setPayment(result.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    socket.on("GateEvent", (msg) => {
      getData();
    });
  }, []);

  if (!payment)
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <MoonLoader color="#000" loading={true} size={20} />{" "}
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100%",
        flexDirection: "row",
        backgroundColor: "#F0F2F9",
      }}
    >
      <Head>
        <title>{transaction.subject}</title>
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
            backgroundColor: "#fafafa",
          }}
        >
          <div
            className={
              "sm:p-[40px] p-[20px]  sm:mt-[20px] mt-[0px]   rounded-0  w-[100%]  "
            }
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderTopLeftRadius: 10,
              height: "100%",
              backgroundColor: "#fff",
              overflowY: "auto",
            }}
          >
            {/* ###### Content #################### */}
            <a
              style={{
                color: "#2c71d1",
                cursor: "pointer",
                marginBottom: 10,
              }}
              onClick={() => {
                Router.push("/request");
              }}
            >
              {"< Retoure"}
            </a>
            <span
              style={{
                color: "rgba(0,0,40,0.7)",
                fontFamily: "SFP-Medium",
                fontSize: 19,
              }}
            >
              Demande
            </span>
            <span
              style={{
                color: "rgba(0,0,40,0.7)",
                fontFamily: "SFP-Medium",
                fontSize: 35,
                marginBottom: 10,
              }}
            >
              {transaction.subject}
            </span>

            {/* ###### Divider ########## */}

            <div
              style={{
                width: "100%",
                height: 1,
                borderColor: "rgba(0,0,0,0.15)",
                borderTopWidth: 1,
              }}
            ></div>

            {/* ###### Divider ########## */}

            <div
              className="sm:w-[calc(100vw-430px)] w-[100vw] "
              style={{
                overflowX: "auto",
              }}
            >
              <div
                //className="sm:flex block "
                style={{
                  width: "160%",
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    Nom
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.name}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    Date
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {dateFormat(transaction.created)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    Sujet
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.subject}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    Email
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.email}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    telephone
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.phone}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    marginRight: 20,
                    padding: 10,
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "SFP-Regular",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.6)",
                    }}
                  >
                    Compagnie
                  </span>
                  <span
                    style={{
                      fontFamily: "SFP-Medium",
                      fontSize: 15,
                      color: "rgba(0,0,40,0.9)",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "26vw",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {payment.company ? payment.company : "/"}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: 50,
                //backgroundColor: "red",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "rgba(0,0,40,0.9)",
                  fontFamily: "SFP-Medium",
                  fontSize: 19,
                  marginTop: 10,
                }}
              >
                Contenu :
              </span>
              <span
                style={{
                  color: "rgba(0,0,40,0.7)",
                  fontFamily: "SFP-Regular",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                {">  " + payment.details}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentsIDs;
