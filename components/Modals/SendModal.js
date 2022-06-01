import React, { useContext, useEffect, useState } from "react";
import InputField from "../InputField";

import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import MyModal from "../MyModal";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import HeaderApp from "../HeaderApp";
import Link from "next/link";
import Head from "next/head";
import SideModal from "../SideModal";
import Cookies from "js-cookie";
import BeatLoader from "react-spinners/BeatLoader";

function financial(x) {
  return x ? Number.parseFloat(x).toFixed(2) : "0.00";
}

function SendModal({ sendModal, setSendModal }) {
  const Router = useRouter();

  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [amountRPU, setAmountRPU] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [currency, setCurrency] = useState(Cookies.get("currency") || "RPU");

  const { user, setUser } = useContext(AuthContext);
  const DeUser = jwtDecode(user.token).data.user;

  const onChange = (e) => {
    Cookies.set("currency", e.target.value);
    setCurrency(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    const preresult = await authApi.getIDByEmail(user.token, username);
    if (!preresult.ok) {
      console.log("failed", result);
    } else {
      if (!preresult["data"]["success"]) {
        alert("Pas D'utilisateur avec cette Addresse");
      } else {
        const result = await authApi.newActivity(
          user.token,
          "Transfer",
          message,
          amountRPU,
          preresult["data"]["id"],
          DeUser.id
        );

        if (!result.ok) {
          console.log("failed", result);
        } else {
          if (!result["data"]["success"]) {
            alert("Erreur: " + result["data"]["message"]);
            console.log(result["data"]);
          } else {
            setSendModal(false);
            window.location.href = "/";
          }
        }
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

  const converting = async () => {
    setDisabled(true);

    setAmountRPU(0);
    const result = await authApi.covertCurrency(user.token, amount, currency);
    if (!result.ok) {
      console.log("failed", result);
    } else {
      setAmountRPU(result["data"]["currency"]);
    }
    setDisabled(false);
  };

  useEffect(() => {
    converting();
  }, [amount, currency]);
  return (
    <span>
      <SideModal
        title={"Envoyer"}
        modalVis={sendModal}
        setModalVis={setSendModal}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              width: "100%",
            }}
          >
            <form
              style={{
                width: "100%",
                height: "100%",
                padding: 30,
              }}
              className={"flex  flex-col "}
            >
              <>
                <InputField
                  name="username"
                  placeholder="Email du Destinataire"
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                  name="message"
                  placeholder="Message"
                  value={message}
                  type="text"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <InputField
                    name="amount"
                    placeholder="Montant"
                    value={amount}
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <select
                    style={{
                      height: "100%",
                      display: "flex",
                      marginBottom: 15,
                      marginLeft: 10,
                      backgroundColor: "#fff",
                    }}
                    value={currency}
                    onChange={(e) => onChange(e)}
                  >
                    <option label="RPU" value="RPU" />
                    <option label="DZD" value="DZD" />
                    <option label="EUR" value="EUR" />
                    <option label="USD" value="USD" />
                  </select>
                </div>
              </>
            </form>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              position: "static",
              bottom: 0,
              padding: 30,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                width: "100%",

                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>Total des frais</span>
                <span>{"0.00 " + currency}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>Total</span>
                <span>{financial(amount) + " " + currency}</span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>Total en RPU</span>
                <span>{financial(amountRPU) + " RPU"}</span>
              </div>
            </div>
            <button
              disabled={disabled}
              style={{
                backgroundColor: disabled ? "grey" : "blue",
                height: 45,
              }}
              className={
                "flex  focus:border-[1px] mb-[10px]   outline-none justify-center items-center rounded-[5px] text-white font-bol"
              }
              onClick={(e) => submit(e)}
            >
              {!disabled && <span>Payer</span>}
              {disabled && (
                <div
                  style={{
                    height: 45,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BeatLoader color="#fff" loading={true} size={12} />
                </div>
              )}
            </button>
          </div>
        </div>
      </SideModal>
    </span>
  );
}

export default SendModal;
