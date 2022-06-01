import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField";

import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import MyModal from "../MyModal";
import Router from "next/router";
import jwtDecode from "jwt-decode";

function LoginModal({ setModalVis, modalVis }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const result = await authApi.login(username, password);

    if (!result.ok) {
      console.log("failed", result);
    } else {
      const token = jwtDecode(result["data"]["data"]["token"]);
      if (token["data"]["user"]["isActive"]) {
        const cookies = await authApi.setCookie(
          result["data"]["data"]["token"]
        );

        setModalVis(false);
        window.location.href = "/";
      } else {
        alert("Account not active");
      }
    }
  };
  const logout = async (e) => {
    e.preventDefault();

    const cookies = await authApi.clearCookie();
    setUser({ token: "" });
    setModalVis(false);
    window.location.href = "/";
  };

  return (
    <MyModal title="Login" setModalVis={setModalVis} modalVis={modalVis}>
      <div className={"flex flex-1 py-[30px] w-[100%] "}>
        <form className={"flex flex-1 flex-col "}>
          {!user["token"] && (
            <>
              <InputField
                name="username"
                placeholder="Username"
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                name="password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className={
                  "flex h-[50px] focus:border-[1px] mb-[10px] border-blue-400 rounded-[11px] outline-none justify-center items-center rounded-[11px] text-white font-bold bg-blue-600"
                }
                onClick={(e) => submit(e)}
              >
                Login
              </button>
            </>
          )}

          {user["token"] && (
            <button
              className={
                "flex h-[50px] focus:border-[1px] border-blue-400 rounded-[11px] outline-none justify-center items-center rounded-[11px] text-white font-bold bg-blue-600"
              }
              onClick={(e) => logout(e)}
            >
              Logout
            </button>
          )}
        </form>
      </div>
    </MyModal>
  );
}

export default LoginModal;
