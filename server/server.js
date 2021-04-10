const express = require("express");
const path = require("path");
const app = express();

const config = require("./config");

const http = require("http").Server(app);

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

app.use(express.static("client/Board"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "Board", "board.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
