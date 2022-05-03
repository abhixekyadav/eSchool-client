const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();
    // apply proxy in dev mode
    if (dev) {
      server.use(
        "/api",
        createProxyMiddleware({
          // target: "http://localhost:8000",
          // target: "https://eschool-server.herokuapp.com/",
          target:
            "http://eschoolserver-env.eba-hjip9cn7.ap-south-1.elasticbeanstalk.com/",
          changeOrigin: true,
        })
      );
    }

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log("> Ready on port", port);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });
