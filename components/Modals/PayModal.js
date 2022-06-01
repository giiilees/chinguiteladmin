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

function PayModal({ sendModal }) {
  const Router = useRouter();
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [currency, setCurrency] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [pToken, setPToken] = useState({});

  const { user, setUser } = useContext(AuthContext);
  const DeUser = jwtDecode(user.token).data.user;

  const onChange = (e) => {
    Cookies.set("currency", e.target.value);
    setCurrency(e.target.value);
  };

  const setSendModal = () => {
    Router.push("/");
  };

  const submit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    const result = await authApi.pay(
      user["token"],
      DeUser["id"],
      Router.query.pay
    );

    if (!result.ok) {
      console.log("failed", result);
    } else {
      if (result.data.success == false) {
        alert(result.data.message);
      } else {
        window.location.href = pToken["values"]["thankyou"];
      }
    }
    setDisabled(false);
  };

  const decode = async () => {
    const result = await authApi.decode(Router.query.pay);
    if (!result.ok) {
      console.log("error token pay , ", result);
    } else {
      setPToken(result.data);
      setCurrency(result.data ? result.data.currency : "");
    }
  };

  useEffect(() => {
    decode();
  }, [Router.query.pay]);

  return (
    <span>
      <SideModal
        title={"Payer"}
        modalVis={Router.query.pay ? true : false}
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
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              width: "100%",
            }}
          >
            <img
              src="/paysvg.svg"
              style={{
                width: 200,
                objectFit: "contain",
                backgroundOrigin: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
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
                <span>Montant</span>
                <span>
                  {pToken ? financial(pToken["sentAmount"]) : "0.00"}
                  {" " + currency}
                </span>
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
                <span>
                  {pToken ? financial(pToken.amount) : "0.00"}
                  {" RPU"}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>Total des frais (RPU)</span>
                <span>
                  {"0.00"}
                  {" RPU"}
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>Total à payer (RPU)</span>
                <span>
                  {pToken ? financial(pToken.amount) : "0.00"}
                  {" RPU"}
                </span>
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

export default PayModal;
