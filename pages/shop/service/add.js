import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import AuthContext from "../../../auth/context";

import authApi from "../../../api/auth";
import jwtDecode from "jwt-decode";

import { useRouter } from "next/router";

import Cookies from "js-cookie";
import MobileNav from "../../../components/MobileNav";
import PayModal from "../../../components/Modals/PayModal";
import SideBar from "../../../components/SideBar";
import { Bar, Line } from "react-chartjs-2";
import HashLoader from "react-spinners/HashLoader";
import OtherSideBar from "../../../components/OtherSideBar";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import NavItems from "../../../config/NavItems";
import ActiveProfile from "../../../components/activeStates/ActiveProfile";
import Menu from "../../../components/Menu";
import MoonLoader from "react-spinners/MoonLoader";
import InputField from "../../../components/InputField";

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
  let date = new Date(time * 1000);
  return (
    date.getDate() +
    " " +
    monthNames[date.getMonth()] +
    ", " +
    date.getFullYear().toString().substr(-2)
  );
}

function CollectionAdd({ menu, setMenu }) {
  const Router = useRouter();
  // const ID = Router.query.id;
  const { user, setUser } = useContext(AuthContext);
  const { business, setBusiness } = useContext(AuthContext);
  const { socket } = useContext(AuthContext);
  const [payment, setPayment] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("N-UM");
  const [description, setDescription] = useState("");

  const DeUser = jwtDecode(user.token);
  const [disabled, setDisable] = useState(false);
  const [final, setFinal] = useState(false);

  const [barVis, setBarVis] = useState(true);

  const currentUser = 50;

  const submitData = async (e) => {
    if (!Router.query.collection) return alert("No Collection found");
    setDisable(true);
    e.preventDefault();
    const result = await authApi.addService(
      user.token,
      Router.query.collection,
      name,
      price,
      currency,
      description
    );
    if (!result.ok) {
      console.log(result);
      setDisable(false);
      return;
    }
    Router.push("/shop");
    setDisable(false);
  };

  if (disabled)
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
        <MoonLoader color="#000" loading={true} size={20} />
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
        <title>{"Ajouter un service"}</title>
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
            title="Ajouter un service"
            user={user}
            menu={menu}
            setMenu={setMenu}
          />
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
            className={"sm:p-[40px] p-[20px]  rounded-0  w-[100%]  "}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",

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
                Router.push("/shop");
              }}
            >
              {"< Retour"}
            </a>
            <span
              style={{
                width: "100%",
                textAlign: "left",
                color: "rgba(0,0,40,0.7)",
                fontFamily: "SFP-Medium",
                fontSize: 22,
                marginBottom: 20,
              }}
            >
              Ajouter un service
            </span>

            <form
              style={{
                display: "flex",
                width: "100%",
              }}
              className={"flex  flex-col "}
            >
              <>
                <InputField
                  name="name"
                  placeholder="Titre"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />

                <InputField
                  name="price"
                  placeholder="Prix"
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
                <InputField
                  name="currency"
                  placeholder="Device"
                  value={currency}
                  type="text"
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <div
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderWidth: 0.5,
                    borderRadius: 7,
                    borderColor: "rgba(0,0,0,0.1)",
                    minHeight: 100,
                  }}
                  className={"flex    mb-[15px] "}
                >
                  <textarea
                    className={
                      "flex-1 p-[10px] focus:border-[1px] border-blue-400  outline-none bg-transparent border-0 "
                    }
                    style={{
                      minHeight: 100,
                      borderRadius: 7,
                    }}
                    name="description"
                    placeholder="Desciption du service"
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <a
                  onClick={(e) => {
                    if (disabled) return;
                    submitData(e);
                  }}
                  style={{
                    display: "flex",
                    height: 40,
                    borderRadius: 7,
                    width: "100%",
                    backgroundColor: "rgba(0,0,30,0.09)",
                    justifyContent: "center",
                    alignItems: "center",

                    marginBottom: 50,
                    cursor: "pointer",
                  }}
                >
                  {!disabled && (
                    <span
                      style={{
                        color: "#000",
                        fontFamily: "SFP-Medium",
                        fontSize: 15,
                      }}
                    >
                      Ajouter
                    </span>
                  )}

                  {disabled && (
                    <MoonLoader color="#000" loading={true} size={12} />
                  )}
                </a>
              </>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionAdd;
