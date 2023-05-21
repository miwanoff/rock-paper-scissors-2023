const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");



const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/healthcheck", (req, res) => {
  res.send("<h2>RPS App running...</h2>");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static(path.join(__dirname, "client")));

io.on("connection", (socket) => {
  console.log("a user is connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
