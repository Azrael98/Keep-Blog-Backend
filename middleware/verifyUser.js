import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  console.log("middleware me aaya")
  const authHeader = req.headers.auth;
  console.log("Value of AuthHeader", authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWTKEY, (err, user) => {
      if (err) return res.status(403).json("Invalid Token");

      req.user = user;
      console.log("Next call hoga ab and user details are: ",user)
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
