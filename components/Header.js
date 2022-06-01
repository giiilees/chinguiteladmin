import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";

import HomeScreen from "../screens/HomeScreen";

import { useRouter } from "next/router";

import cookie from "cookie";
import Cookies from "js-cookie";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from "react-responsive-carousel";
import { AiFillPhone, AiOutlineWifi } from "react-icons/ai";
import { BsFillPhoneFill, BsWifi2 } from "react-icons/bs";
import { FaHeadset, FaInternetExplorer } from "react-icons/fa";
import ActiveLink from "./activeStates/ActiveLink";
import { CgClose, CgMathEqual } from "react-icons/cg";

function Header({ menu, setMenu }) {
  const { user, setUser } = useContext(AuthContext);
  const [render, setRender] = useState(0);
  const [cities, setCities] = useState(0);
  const [sellPoint, setSellPoint] = useState(0);

  const Router = useRouter();

  return (
    <div
      style={{
        width: "100%",
        height: 75,
      }}
    >
      <div
        className={"sm:px-[150px] px-[30px] "}
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-start",
          height: 75,
          // backgroundColor: "red",

          alignItems: "center",
        }}
      >
        <img
          onClick={() => {
            Router.push("/");
          }}
          className="sm:left-[150px] left-[30px]"
          src={"/vectlogo.png"}
          style={{
            position: "absolute",
            width: 30,
            cursor: "pointer",
            height: 30,
            objectFit: "contain",
            backgroundSize: "contain",
          }}
        />
        <div
          className={"lg:flex hidden"}
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            left: 100,
            marginLeft: 80,
          }}
        >
          <ActiveLink href={"/individual"}>Particuliers</ActiveLink>
          <ActiveLink href={"/entreprise"}>Entreprise</ActiveLink>
          <ActiveLink href={"/about"}>Qui somme nous ?</ActiveLink>
          <ActiveLink href={"/shop"}>Services</ActiveLink>
          <ActiveLink href={"/recharge"}>Recharge</ActiveLink>
        </div>
        <div
          className="sm:right-[150px] right-[30px]"
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            className="sm:hidden flex"
            style={{
              height: 40,
              width: 40,

              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            {!menu ? (
              <CgMathEqual
                className={"sm:hidden flex"}
                style={{}}
                color="#fff"
                size={30}
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(!menu);
                }}
              />
            ) : (
              <CgClose
                className={"sm:hidden flex"}
                style={{}}
                color="#fff"
                size={27}
                onClick={(e) => {
                  e.preventDefault();
                  setMenu(!menu);
                }}
              />
            )}
          </div>
          {!user.token && (
            <div
              onClick={() => {
                Router.push("/auth/login");
              }}
              className={"sm:flex hidden "}
              style={{
                cursor: "pointer",
                height: 40,
                marginRight: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 4,
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "SFP-Regular",
                  fontSize: 15,
                }}
              >
                Connexion
              </span>
            </div>
          )}
          <div
            onClick={() => {
              if (!user.token) {
                Router.push("/auth/signup");
              } else {
                Router.push("/menu/profile");
              }
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              width: 130,
              height: 40,
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 1000,
            }}
          >
            <span
              style={{
                color: "#fff",
                fontFamily: "SFP-Regular",
                fontSize: 15,
              }}
            >
              {!user.token ? "S'inscrire" : "Compte"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
