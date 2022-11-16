import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
 
  optionsSuccessStatus: 200,
};

export default corsOptions;