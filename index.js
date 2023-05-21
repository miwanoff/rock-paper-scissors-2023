const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

app.get("/healthcheck", (req, res) => {
  res.send("<h2>RPS App running...</h2>");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static(path.join(__dirname, "client")));

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("сreateGame", () => {
    console.log("сreateGame2");

    const roomUniqueId = makeid(6);
    rooms[roomUniqueId] = {};
    socket.join(roomUniqueId);
    socket.emit("newGame", { roomUniqueId: roomUniqueId });
  });

  socket.on("joinGame", (data) => {
    if (rooms[data.roomUniqueId] != null) {
      socket.join(data.roomUniqueId);
      socket.to(data.roomUniqueId).emit("playersConnected", {});
      socket.emit("playersConnected");
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
