import { Menu } from "@headlessui/react";
import jwtDecode from "jwt-decode";
import React, { useContext, useState } from "react";
import AuthContext from "../../auth/context";
import authApi from "../../api/auth";
import { useRouter } from "next/router";
import Link from "next/link";

function UserMenu({ registerSet }) {
  const { user, setUser } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const Router = useRouter();

  const DeUser = user.token ? jwtDecode(user.token) : "";

  const logout = async (e) => {
    e.preventDefault();

    const cookies = await authApi.clearCookie();

    window.location.href = "/";
  };
  return (
    <>
      <div
        onClick={(e) => setVisible(!visible)}
        style={{
          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 7,
          paddingBottom: 7,
          borderRadius: 5,
          backgroundColor: "rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: 10 }} className={"hidden md:flex"}>
          {user.token ? DeUser["name"] : "Account"}
        </span>
        <img
          src={user.token ? user.data.profilePic : "/user.png"}
          style={{
            objectFit: "cover",
            width: 29,
            height: 29,
          }}
          className={" object-cover rounded-[100px]   "}
        />
      </div>
      {visible && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "#fff",
            zIndex: 99999,
            top: 60,
            boxShadow: "0px 0px 50px 5px rgba(0,0,0,0.2)",
            display: "flex",
            cursor: "default",
            flexDirection: "column",
            padding: 5,

            outline: "none",
          }}
          className={" fixwidt "}
        >
          {!user.token && (
            <>
              <Link href="/login">
                <a
                  style={{
                    height: 50,
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    outline: "none",
                    marginBottom: 5,
                    justifyContent: "flex-start",
                    paddingLeft: 25,
                    paddingRight: 25,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    Login
                  </span>
                </a>
              </Link>
              <Link href="/register">
                <a
                  style={{
                    height: 50,
                    borderRadius: 5,
                    width: "100%",
                    display: "flex",
                    outline: "none",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    justifyContent: "flex-start",
                    paddingLeft: 25,
                    paddingRight: 25,
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "#000",
                    }}
                  >
                    Register
                  </span>
                </a>
              </Link>
            </>
          )}
          {user.token && (
            <div>
              <a
                onClick={(e) => logout(e)}
                style={{
                  height: 50,
                  borderRadius: 5,
                  width: "100%",
                  display: "flex",
                  cursor: "pointer",
                  outline: "none",
                  backgroundColor: "#fff",
                  justifyContent: "flex-start",
                  paddingLeft: 25,
                  paddingRight: 25,
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#000",
                  }}
                >
                  Logout
                </span>
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserMenu;
