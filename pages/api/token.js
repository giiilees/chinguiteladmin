import Cookies from "cookies";

export default (req, res) => {
  const token = req.cookies.token || "";
  res.statusCode = 200;
  res.json({ token: token });
};
