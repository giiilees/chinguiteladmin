import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../auth/context";

import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";

function ActiveLink({ href, children }) {
  const Router = useRouter();

  const splited = Router.asPath.split("/");
  const splitedHref = href.split("/");

  const isCurrentPath = "/" + splited[1] === "/" + splitedHref[1];

  const handleClick = (e) => {
    e.preventDefault();
    Router.push(href);
  };

  return (
    <>
      <span
        onClick={() => {
          Router.push(href);
        }}
        style={{
          color: isCurrentPath ? "green" : "#fff",
          fontFamily: "SFP-Medium",
          fontSize: 16,
          marginRight: 25,
          cursor: "pointer",
        }}
      >
        {children}
      </span>
    </>
  );
}

export default ActiveLink;
