const express = require("express");
const app = express();
const http = require("http");
const path = require('path');

const server = http.createServer(app);

app.get("/healthcheck", (req, res) => {
  res.send("<h2>RPS App running...</h2>");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static(path.join(__dirname, 'client')));

server.listen(3000, () => {
  console.log("listening on *:3000");
});
