const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Not athurize" });
  }
  try {
    token = token.split("Bearer ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.json({ error: "Invalid Token" });
    }
    if (decode.role === "admin") {
      req.user = decode;
      next();
    } else {
      return res.status(401).json({ error: "Not athurize" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Not athurize" });
  }
  try {
  } catch (error) {}
};
