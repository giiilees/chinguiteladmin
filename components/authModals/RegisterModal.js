import React, { useContext, useEffect, useState } from "react";
import InputField from "../../components/InputField";

import authApi from "../../api/auth";
import AuthContext from "../../auth/context";
import MyModal from "../MyModal";
import Router from "next/router";

function RegisterModal({ setModalVis, modalVis }) {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    const result = await authApi.register(
      firstname,
      lastname,
      username,
      email,
      password
    );

    if (!result.ok) {
      console.log("failed", result);
    } else {
      alert("Registred");
    }
  };

  return (
    <MyModal title="Register" setModalVis={setModalVis} modalVis={modalVis}>
      <div className={"flex flex-1 py-[30px] w-[100%] "}>
        <form className={"flex flex-1 flex-col "}>
          {!user["token"] && (
            <>
              <InputField
                name="firstname"
                placeholder="Firstname"
                value={firstname}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputField
                name="lastname"
                placeholder="Lastname"
                value={lastname}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
              <InputField
                name="username"
                placeholder="Username"
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />

              <InputField
                name="email"
                placeholder="Email Address"
                value={email}
                type="text"
                onChange={(e) => setEmail(e.target.value)}
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
                  "flex h-[50px] focus:border-[1px] mb-[10px] border-blue-400 rounded-[11px] outline-none justify-center items-center text-white font-bold bg-blue-600"
                }
                onClick={(e) => submit(e)}
              >
                Register
              </button>
            </>
          )}
        </form>
      </div>
    </MyModal>
  );
}

export default RegisterModal;
