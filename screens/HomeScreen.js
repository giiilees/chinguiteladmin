import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "next/head";
import AuthContext from "../auth/context";

import authApi from "../api/auth";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import Menu from "../components/Menu";

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

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function reverseArray(array) {
  return array ? array.reverse() : false;
}

const postNumber = 5;

function HomeScreen({ menu, setMenu }) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const DeUser = jwtDecode(user.token);
  const { socket } = useContext(AuthContext);
  const chartRef = useRef(null);
  const [barVis, setBarVis] = useState(true);
  const [balance, setBalance] = useState(false);
  const [balanceTime, setBalanceTime] = useState("all");
  const [todayBalance, setTodayBalance] = useState(false);
  const [instanceBalance, setInstanceBalance] = useState(false);
  const [chartBal, setChartBal] = useState(false);
  const [payments, setPayments] = useState(null);

  const getData = async () => {
    setPayments(false);
    const result = await authApi.getPayments(
      user.token,
      business,
      postNumber,
      "",
      balanceTime
    );

    if (!result.ok) {
      alert(result.data);
    } else {
      setPayments(result.data);
    }
  };

  const getBalance = async (state) => {
    if (state) {
      setBalance(false);
      setTodayBalance(false);
    } else {
      setBalance(false);
      setTodayBalance(false);
      setChartBal(false);
    }

    const getLimit = (time) => {
      if (time == "all") return 20;
      if (time == "year") return 12;
      if (time == "month") return 15;
      return 10;
    };

    const result = await authApi.getBalance(
      user.token,
      business,
      getLimit(balanceTime),
      balanceTime
    );

    if (!result.ok) {
      alert(result.data);
    } else {
      setBalance(result.data.balance);
      setTodayBalance(result.data.today);
      setChartBal(result.data.data);
    }
  };

  useEffect(() => {
    getBalance(true);
    getData();
  }, [balanceTime]);

  useEffect(() => {
    setTimeout(() => {
      setMenu(false);
    }, 500);
    getData();
    getBalance();
  }, [business]);

  useEffect(() => {
    socket.on("GateEvent", (msg) => {
      getData();
      getBalance();
    });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        backgroundColor: "#F0F2F9",
      }}
    >
      <Head>
        <title>Dashboard</title>
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
          <Menu title="Home" user={user} menu={menu} setMenu={setMenu} />
        </div>
        <div
          className={"  p-0  "}
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            zIndex: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className={"  rounded-0  w-[100%]  "}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",

              height: "100%",
              backgroundColor: "#fafafa",
              overflowY: "auto",
              padding: 20,
            }}
          >
            {/* ###### Content #################### */}

            <div
              style={{
                width: "100%",
              }}
            >
              <div
                className={"sm:flex-row flex-col sm:border-b-[1px] border-b-0	 "}
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: 70,

                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className={"sm:border-r-[1px] border-r-0	"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 3,

                    //  backgroundColor: "red",
                  }}
                >
                  <div
                    className={"sm:p-[20px] pl-[20px] p-[20px] pl-[0px]	"}
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      // backgroundColor: "red",
                      flexDirection: "column",

                      justifyContent: "center",
                      alignItems: "flex-start",
                      borderBottomWidth: 1,
                      borderColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "SFP-Regular",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      {balanceTime == "all"
                        ? "Total Balance"
                        : "Balance (" + balanceTime.toUpperCase() + ")"}
                    </span>
                    {balance && chartBal && (
                      <span
                        style={{
                          fontFamily: "SFP-Medium",
                          fontSize: 24,
                          color: "rgba(0,0,0,0.8)",
                        }}
                      >
                        {"€ " +
                          financial(
                            instanceBalance
                              ? chartBal.balance[instanceBalance - 1]
                              : balanceTime == "all"
                              ? balance.balance
                              : chartBal.balance[chartBal.balance.length - 1]
                          )}
                      </span>
                    )}
                    {!balance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: "60%",
                          height: 25,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                    {balance && (
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: "rgba(0,50,200,0.7)",
                        }}
                      >
                        {"Net: € " +
                          financial(
                            instanceBalance
                              ? chartBal.net[instanceBalance - 1]
                              : balance.net
                          )}
                      </span>
                    )}
                    {!balance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: "80%",
                          height: 22,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                  </div>
                  <div
                    className={"sm:p-[20px] pl-[20px] p-[20px] pl-[0px]	"}
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      // backgroundColor: "green",
                      flexDirection: "column",

                      // paddingTop: 10,
                      // paddingBottom: 20,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "SFP-Regular",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Payout
                    </span>
                    {balance && (
                      <span
                        style={{
                          fontFamily: "SFP-Medium",
                          fontSize: 24,
                          color: "rgba(0,0,0,0.8)",
                        }}
                      >
                        {"€ " + financial(0)}
                      </span>
                    )}
                    {!balance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: "40%",
                          height: 25,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                    {balance && (
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: "rgba(0,50,200,0.7)",
                        }}
                      >
                        View
                      </span>
                    )}
                    {!balance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: "60%",
                          height: 22,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",

                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
                <div
                  className={
                    "sm:p-[20px] sm:pl-[30px] sm:pb-[20px] sm:pt-[20px] p-[0px] pb-[30px] pt-[20px]	"
                  }
                  style={{
                    display: "flex",
                    flex: 7,
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {!chartBal && (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",

                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff",
                      }}
                    >
                      <div
                        className={"animate-pulse "}
                        style={{
                          minHeight: 200,
                          width: "100%",
                          borderRadius: 10,
                          backgroundColor: "rgba(0,0,0,0.1)",
                        }}
                      ></div>
                    </div>
                  )}
                  {chartBal && chartBal.balance && (
                    <Line
                      onMouseOut={() => {
                        setInstanceBalance(false);
                      }}
                      height={110}
                      style={{
                        maxWidth: "100%",
                      }}
                      ref={chartRef}
                      options={{
                        onHover: (e, item) => {
                          const chart = chartRef.current;
                          if (item.length) {
                            const itemIndex = item[0].index;

                            if (instanceBalance - 1 === itemIndex) return;
                            setInstanceBalance(itemIndex + 1);
                          }
                        },
                        onClick: (e, item) => {
                          const chart = chartRef.current;
                          if (item.length) {
                            const itemIndex = item[0].index;

                            if (instanceBalance - 1 === itemIndex) return;
                            setInstanceBalance(itemIndex + 1);
                          }
                        },
                        plugins: {
                          legend: {
                            display: false,
                          },
                          tooltip: {
                            enabled: false,
                            callbacks: {
                              label: function () {},
                              beforeLabel: function () {},
                              afterLabel: function () {},
                            },
                          },
                        },
                        scales: {
                          x: {
                            ticks: {
                              display: false,
                            },
                          },
                          y: {
                            display: false,
                          },
                        },
                      }}
                      data={{
                        labels: chartBal.balance,
                        datasets: [
                          {
                            data: chartBal.balance,
                            fill: false,
                            borderWidth: 1,
                            borderColor: "#2c71d1",
                            tension: 0.18,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            fill: false,
                            backgroundColor: "rgba(0,50,200,0.1)",
                          },
                        ],
                      }}
                    />
                  )}
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      height: 40,
                      backgroundColor: "rgba(0,0,0,0.06)",
                      borderRadius: 10,
                      padding: 4,
                      marginTop: 20,
                    }}
                  >
                    <div
                      onClick={() => {
                        setBalanceTime("day");
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          balanceTime == "day" ? "#2c71d1" : "rgba(0,0,0,0)",
                        borderRadius: 7,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: balanceTime == "day" ? "#fff" : "#000",
                        }}
                      >
                        Day
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setBalanceTime("month");
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          balanceTime == "month" ? "#2c71d1" : "rgba(0,0,0,0)",
                        borderRadius: 7,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: balanceTime == "month" ? "#fff" : "#000",
                        }}
                      >
                        Month
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setBalanceTime("year");
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          balanceTime == "year" ? "#2c71d1" : "rgba(0,0,0,0)",
                        borderRadius: 7,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: balanceTime == "year" ? "#fff" : "#000",
                        }}
                      >
                        Year
                      </span>
                    </div>
                    <div
                      onClick={() => {
                        setBalanceTime("all");
                      }}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        flex: 1,
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor:
                          balanceTime == "all" ? "#2c71d1" : "rgba(0,0,0,0)",
                        borderRadius: 7,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: balanceTime == "all" ? "#fff" : "#000",
                        }}
                      >
                        All
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span
              className={" sm:mt-[30px] mt-[20px] "}
              style={{
                width: "100%",
                textAlign: "left",
                color: "rgba(0,0,40,0.7)",
                fontFamily: "SFP-Medium",
                fontSize: 22,

                marginBottom: 10,
              }}
            >
              Today
            </span>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                className={"sm:flex-row flex-col"}
                style={{
                  display: "flex",
                  width: "100%",
                  minHeight: 70,
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.1)",
                }}
              >
                <div
                  className={"sm:border-r-[1px] border-r-0	"}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 3,

                    //  backgroundColor: "red",
                  }}
                >
                  <div
                    className={
                      "sm:p-[20px] sm:pr-[30px] pl-[20px] p-[20px] pl-[0px] pr-[30px]	"
                    }
                    style={{
                      display: "flex",

                      // backgroundColor: "red",
                      flexDirection: "column",

                      justifyContent: "center",
                      alignItems: "flex-start",
                      borderRightWidth: 1,
                      borderColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "SFP-Regular",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Income
                    </span>
                    {todayBalance && (
                      <span
                        style={{
                          fontFamily: "SFP-Medium",
                          fontSize: 24,
                          color: "rgba(0,0,0,0.8)",
                        }}
                      >
                        {"€ " + financial(todayBalance.balance)}
                      </span>
                    )}
                    {!todayBalance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: 100,
                          height: 25,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                    {todayBalance && (
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: "rgba(0,50,200,0.7)",
                        }}
                      >
                        {"Net: € " + financial(todayBalance.net)}
                      </span>
                    )}
                    {!todayBalance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: 120,
                          height: 22,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                  </div>
                  <div
                    className={"sm:p-[20px]  pl-[20px] p-[20px] pl-[20px]	"}
                    style={{
                      display: "flex",

                      // backgroundColor: "green",
                      flexDirection: "column",

                      // paddingTop: 10,
                      // paddingBottom: 20,
                      justifyContent: "center",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "SFP-Regular",
                        fontSize: 15,
                        color: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Payout
                    </span>

                    {!todayBalance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: 100,
                          height: 25,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                    {todayBalance && (
                      <span
                        style={{
                          fontFamily: "SFP-Medium",
                          fontSize: 24,
                          color: "rgba(0,0,0,0.8)",
                        }}
                      >
                        {"€ " + financial(0)}
                      </span>
                    )}
                    {todayBalance && (
                      <span
                        style={{
                          fontFamily: "SFP-Regular",
                          fontSize: 15,
                          color: "rgba(0,50,200,0.7)",
                        }}
                      >
                        View
                      </span>
                    )}
                    {!todayBalance && (
                      <div
                        className={"animate-pulse "}
                        style={{
                          width: 120,
                          height: 22,
                          borderRadius: 5,
                          backgroundColor: "rgba(0,0,0,0.1)",
                          marginBottom: 5,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={" sm:mt-[30px] mt-[30px] "}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <span
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "rgba(0,0,40,0.7)",
                  fontFamily: "SFP-Medium",
                  fontSize: 22,
                }}
              >
                Latest Transactions
              </span>
              <a
                onClick={(e) => {
                  Router.push("/payments");
                }}
                style={{
                  display: "flex",
                  height: 35,
                  borderRadius: 5,
                  width: 100,

                  justifyContent: "center",
                  alignItems: "center",

                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "#2c71d1",
                    fontFamily: "SFP-Medium",
                    fontSize: 15,
                  }}
                >
                  View all
                </span>
              </a>
            </div>

            <div
              style={{
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                }}
              >
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
                          paddingLeft: 5,
                          paddingRight: 5,
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
              </div>
              {payments && !payments.data[0] && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",

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
                    No Payments
                  </span>
                </div>
              )}
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  paddingBottom: 50,
                  top: 0,
                  left: 0,
                }}
              >
                {payments &&
                  payments.data[0] &&
                  payments.data.map((i, index) => {
                    let item = i.payment;
                    return (
                      <div
                        key={index}
                        style={{
                          maxWidth: "100%",
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
                            height: 50,
                            borderBottomWidth: 0.5,
                            borderBottomColor: "rgba(0,0,0,0.1)",
                            //backgroundColor: "rgba(0,0,30,0.05)",
                            // marginBottom: 10,
                            //borderRadius: 5,
                            position: "relative",
                            paddingLeft: 5,
                            paddingRight: 5,
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
                            {item.currency + " " + item.amount}
                          </span>
                          <span
                            style={{
                              color:
                                item.status == "Succeeded"
                                  ? "green"
                                  : item.status == "Incomplete"
                                  ? "grey"
                                  : "red",
                              fontFamily: "SFP-Regular",
                              width: 200,
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              marginRight: 10,
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.status}
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
                                " sm:flex hidden sm:w-[calc(100vw-850px)] w-[calc(100vw-260px)]"
                              }
                            >
                              {item.description ? item.description : item._id}
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
                                {item.payment.card.brand.toUpperCase()}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
