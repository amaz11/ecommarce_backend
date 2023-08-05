const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("jsonwebtoken");
require("dotenv").config();
const app = express();
const connectDB = require("./db/db");
const { sameSiteCookieMiddleware } = require("express-samesite-default");
var cookieSession = require("cookie-session");

//Router
const authentication = require("./routes/authentication");

//Middelware
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin: ["http://127.0.0.1:3000/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    credentials: false,
    // allowedHeaders: "Content-Type, Accept",
  })
);
app.use(sameSiteCookieMiddleware());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cookieSession({
    name: "__session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 100,
    secure: true,
    httpOnly: true,
    sameSite: "none",
  })
);

app.use(cookieParser());

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
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://127.0.0.1:4000`);
  });
});
