const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let dataUri = "";

io.on("connect", (socket) => {
  const sendHeartBeat = () => {
    socket.send(dataUri);
  };
  setInterval(sendHeartBeat, 1000);
});

io.on("connection", (socket) => {
  socket.on("change_bg", (message) => {
    dataUri = message;
  });
});

nextApp.prepare().then(() => {
  //   app.use("/static", (req, res, next) => {
  //     express.static(staticFolder)(req, res, next);
  //   });
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
