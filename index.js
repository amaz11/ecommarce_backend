const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("jsonwebtoken");
require("dotenv").config();
const app = express();

//Router
const authentication = require("./routes/authentication");

// Database
require("./db/db");
var whitelist = ["http://localhost:3000/", "http://example2.com"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
//Middelware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: true,
    allowedHeaders: "Content-Type, Accept",
  })
);

// app.use(cors());

// const { createProxyMiddleware } = require("http-proxy-middleware");
// app.use(
//   "/",
//   createProxyMiddleware({
//     target: "http://localhost:9000/", //original url
//     changeOrigin: true,
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//       proxyRes.headers["Access-Control-Allow-Origin"] = "*";
//     },
//   })
// );

//API
app.use("/", authentication);
app.use("/api/v1/", require("./routes/product"));
app.use("/api/v1/", require("./routes/order"));
app.use("/api/v1/productRn", require("./routes/productRn"));

// app.use("/post-api", postRoute);
// app.use(require("./router/userRoute"));

// Port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`http://127.0.0.1:4000`);
});
