import { useRouter } from "next/router";
import { useContext } from "react";
import AuthContext from "../../auth/context";

import authApi from "../../api/auth";
import jwtDecode from "jwt-decode";

function ActiveText({ href, Icon, activeColor, color, size }) {
  const router = useRouter();

  const { user, setUser } = useContext(AuthContext);
  const DeUser = jwtDecode(user.token);

  const splited = router.asPath.split("/");
  const splitedHref = href.split("/");

  const isCurrentPath = "/" + splited[1] === "/" + splitedHref[1];

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <>
      <div className={"flex flex-1 justify-center items-center "}>
        <a href={href} onClick={handleClick}>
          <Icon color={isCurrentPath ? activeColor : color} size={size} />
        </a>
      </div>
    </>
  );
}

export default ActiveText;
