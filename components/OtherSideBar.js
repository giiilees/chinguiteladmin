import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import Link from "next/link";
import authApi from "../api/auth";
import { BsArrowDownShort, BsArrowUpShort, BsPlus } from "react-icons/bs";

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function reverseArray(array) {
  return array ? array.reverse() : false;
}

function OtherSideBar(props) {
  const Router = useRouter();
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState("email");

  const [barVis, setBarVis] = useState(true);

  const handleRediv = (e) => {
    e.preventDefault();
    Router.push("/send/" + type + "/?amount=" + amount);
    //Router.query
  };

  const fetchData = async () => {
    const result = await authApi.getBalance(user.token, user.data.wallet);
    if (!result.ok) {
      console.log(result);
    } else {
      setBalance(result.data.balance);
    }
  };

  useEffect(() => {
    if (socket)
      socket.on("ChainEvent", (msg) => {
        fetchData();
      });
    fetchData();
  }, []);

  return (
    <div
      className={"sm:flex hidden "}
      style={{
        flexDirection: "column",
        height: "100%",
        width: "100%",
        marginLeft: 25,
      }}
    >
      {/* <div
        className={"lg:flex hidden "}
        style={{
          height: 80,
          backgroundColor: "#fff",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          paddingLeft: 20,
          paddingRight: 20,
          marginBottom: 25,
          borderRadius: 7,
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 20,
            backgroundColor: "#1766AF",
            height: 35,
            width: 35,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "rgba(250,250,255,0.9)",
              fontFamily: "SFP-SemiBold",
              fontSize: 15,
              margin: 5,
            }}
          >
            GL
          </span>
        </div>
      </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",

            borderRadius: 7,
            padding: 20,
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <span
            style={{
              color: "rgba(0,0,40,0.6)",
              fontFamily: "SFP-Medium",
              marginBottom: 20,
              textAlign: "left",
            }}
          >
            Total balance
          </span>
          <span
            style={{
              color: "rgba(0,0,40,0.95)",
              fontFamily: "SFP-Medium",

              fontSize: 34,
              textAlign: "left",
            }}
          >
            {"€" + financial(balance)}
          </span>
          <span
            style={{
              color: "rgba(0,0,40,0.6)",
              fontFamily: "SFP-Medium",
              marginBottom: 0,
              width: 300,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {"Wallet: " + user.data.wallet}
          </span>
          <div
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <Link href="">
                <a className={"lg:hidden flex "}>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      marginRight: 25,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 55,

                        width: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 75,
                        backgroundColor: "rgba(0,0,0,0.1)",
                      }}
                    >
                      <BsArrowUpShort size={35} color="#000" />
                    </div>
                    <span
                      style={{
                        marginTop: 5,
                        fontFamily: "SFP-Medium",
                      }}
                    >
                      Send
                    </span>
                  </div>
                </a>
              </Link>
              <Link href="">
                <a>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",

                      marginRight: 25,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        height: 55,
                        width: 55,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 75,
                        backgroundColor: "#1766AF",
                      }}
                    >
                      <BsPlus size={35} color="#fff" />
                    </div>
                    <span
                      style={{
                        marginTop: 5,
                        fontFamily: "SFP-Medium",
                      }}
                    >
                      Fund
                    </span>
                  </div>
                </a>
              </Link>
              <Link href="">
                <a
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      height: 55,
                      width: 55,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 75,
                      backgroundColor: "rgba(0,0,0,0.1)",
                    }}
                  >
                    <BsArrowDownShort size={35} color="black" />
                  </div>
                  <span
                    style={{
                      marginTop: 5,
                      fontFamily: "SFP-Medium",
                    }}
                  >
                    Receive
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div
          className={"lg:flex hidden "}
          style={{
            position: "relative",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            marginLeft: 25,
            borderRadius: 7,
            padding: 20,
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <span
            style={{
              color: "rgba(0,0,40,0.7)",
              fontFamily: "SFP-Medium",
              marginBottom: 30,
            }}
          >
            Quick Send
          </span>
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                color: "rgba(0,0,40,0.45)",
                fontFamily: "SFP-Regular",
                fontSize: 15,
                margin: 5,
              }}
            >
              From
            </span>
            <div
              style={{
                display: "flex",
                height: 55,
                width: "100%",
                borderWidth: 0.5,
                borderRadius: 7,
                borderColor: "rgba(0,0,40,0.1)",
                justifyContent: "space-between",
                backgroundColor: "rgba(0,0,30,0.03)",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "rgba(0,0,40,0.45)",
                    fontFamily: "SFP-Regular",
                    fontSize: 15,
                    margin: 5,
                  }}
                >
                  {"€"}
                </span>
                <input
                  type="number"
                  min={0}
                  max={100000}
                  style={{
                    fontFamily: "SFP-Regular",
                    color: "rgba(0,0,40,0.8)",
                    height: "100%",
                    width: "100%",
                    marginRight: 10,
                    backgroundColor: "rgba(255,255,255,0)",
                    borderWidth: 0,
                    outline: 0,
                  }}
                  value={financial(amount)}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "rgba(0,30,50,0.35)",
                    height: 35,
                    width: 35,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "rgba(250,250,255,0.9)",
                      fontFamily: "SFP-SemiBold",
                      fontSize: 15,
                      margin: 5,
                    }}
                  >
                    {user.data.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span
                  style={{
                    color: "rgba(0,0,40,0.7)",
                    fontFamily: "SFP-Regular",
                    fontSize: 15,
                    margin: 5,
                  }}
                >
                  Wallet
                </span>
              </div>
            </div>
            <span
              style={{
                color: "rgba(0,0,40,0.45)",
                fontFamily: "SFP-Regular",
                fontSize: 15,
                margin: 5,
                marginTop: 20,
              }}
            >
              To
            </span>
            <div
              style={{
                display: "flex",
                height: 55,
                width: "100%",
                borderWidth: 0.5,
                borderRadius: 7,
                borderColor: "rgba(0,0,40,0.1)",
                justifyContent: "space-between",
                backgroundColor: "rgba(0,0,30,0.03)",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <select
                  style={{
                    backgroundColor: "rgba(255,255,255,0)",
                    borderWidth: 0,
                    width: "100%",
                    fontFamily: "SFP-Regular",
                    color: "rgba(0,0,40,0.7)",
                    height: "100%",
                    outline: 0,
                  }}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option label="DeltaWire (Email)" value="email" />
                  <option label="Wallet Address" value="wallet" />
                  <option label="Bank Account" value="bank" />
                </select>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 20,
              display: "flex",
              width: "100%",
              flexDirection: "column",
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Link href="">
              <a onClick={(e) => handleRediv(e)}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    backgroundColor: "#1766AF",
                    height: 45,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 100,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(250,250,255,0.9)",
                      fontFamily: "SFP-SemiBold",
                      fontSize: 15,
                      margin: 5,
                    }}
                  >
                    Review
                  </span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherSideBar;
