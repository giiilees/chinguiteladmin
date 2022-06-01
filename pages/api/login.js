import cookie from "cookie";

export default (req, res) => {
  if (req.body.token) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", req.body.token, {
        httpOnly: true,
        //domain: ".deltawire.io",
        maxAge:
          req.body.professional == "professional" ? 60 * 60 * 24 * 30 : 60 * 15,

        path: "/",
      })
    );
    res.statusCode = 200;
    res.json({ success: true });
  } else {
    res.statusCode = 401;
    res.json({ success: false, message: "No Token" });
  }
};
