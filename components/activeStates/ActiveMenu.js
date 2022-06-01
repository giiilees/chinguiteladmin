import Link from "next/link";
import { useRouter } from "next/router";
import AuthContext from "../../auth/context";

import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useState } from "react";

function AcriveMenu({ href, name, Icon, color, coloract, onPress, size }) {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const [hover, setHover] = useState(false);
  const DeUser = jwtDecode(user.token);

  const splited = router.asPath.split("/");
  const splitedHref = href?.split("/");

  let isCurrentPath = href
    ? "/" + splited[1] === "/" + splitedHref[1]
    : clicked;

  return (
    <Link href={href ? href : ""}>
      <a
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseLeave={() => {
          setHover(false);
        }}
        style={{
          position: "relative",
        }}
        onClick={() => {
          if (href) return;
          if (!href) setClicked(!clicked);
          onPress();
        }}
      >
        <Icon
          size={size}
          color={isCurrentPath ? coloract : color}
          style={{ marginBottom: 20 }}
        />
        {hover && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: -31,
              left: 60,
              height: 30,
              width: 70,
              backgroundColor: "rgba(0,0,0,0.7)",
              borderRadius: 7,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <span
              style={{
                fontFamily: "SFP-Regular",
                color: "#fff",
                fontSize: 14,
              }}
            >
              {name}
            </span>
          </div>
        )}
      </a>
    </Link>
  );
}

export default AcriveMenu;
