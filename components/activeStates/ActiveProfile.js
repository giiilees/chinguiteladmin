import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../auth/context";

import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";

function ActiveProfile({ href, name, children, Icon, size }) {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);

  const splited = router.asPath.split("/");
  const splitedHref = href?.split("/");

  let isCurrentPath = "/" + splited[1] === "/" + splitedHref[1];

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  const handleClickChild = (hrefChild) => {
    router.push(hrefChild);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <a
        href={href}
        onClick={handleClick}
        style={{
          display: "flex",
          height: 45,
          width: "100%",
          backgroundColor: isCurrentPath ? "#2c71d1" : "rgba(0,0,0,0.00)",
          justifyContent: "flex-start",
          paddingLeft: 20,
          borderRadius: 7,
          alignItems: "center",
        }}
      >
        <Icon color={isCurrentPath ? "#fff" : "rgba(0,0,40,0.8)"} size={size} />
        <span
          style={{
            marginLeft: 10,
            color: isCurrentPath ? "#fff" : "rgba(0,0,40,0.8)",
            fontFamily: "SFP-Regular",
          }}
        >
          {name}
        </span>
      </a>

      {children &&
        isCurrentPath &&
        children.map((item, index) => {
          const splitedChild = router.asPath.split("/");
          const splitedHrefChild = item.href?.split("/");

          let isCurrentPathchild =
            "/" + splitedChild[2] === "/" + splitedHrefChild[2];
          return (
            <a
              key={index}
              onClick={() => handleClickChild(item.href)}
              style={{
                display: "flex",
                cursor: "pointer",
                height: 37,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.00)",
                justifyContent: "flex-start",
                paddingLeft: 53,
                borderRadius: 7,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: isCurrentPathchild
                    ? "rgba(0,60,255,0.8)"
                    : "rgba(0,0,40,0.8)",
                  fontFamily: "SFP-Regular",
                }}
              >
                {item.name}
              </span>
            </a>
          );
        })}
    </div>
  );
}

export default ActiveProfile;
