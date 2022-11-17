import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.auth;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "jwtkey", (err, user) => {
      if (err) return res.status(403).json("Invalid Token");

      req.user = user;
      console.log("next k theek upar")
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
