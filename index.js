const express = require("express");
const app = express();
const http = require("http");

const server = http.createServer(app);

app.get("/test", (req, res) => {
  res.send("<h1>RPS App running...</h1>");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
