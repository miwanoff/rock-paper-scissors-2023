console.log("client.js loaded");
const socket = io();
let roomUniqueId = null;

function сreateGame() {
    console.log("сreateGame1");
  socket.emit("сreateGame");
}

function joinGame() {
  roomUniqueId = document.getElementById("roomUniqueId").value;
  socket.emit("joinGame", { roomUniqueId: roomUniqueId });
}

socket.on("newGame", (data) => {
  roomUniqueId = data.roomUniqueId;
  document.getElementById("initial").style.display = "none";
  document.getElementById("gamePlay").style.display = "block";
  document.getElementById(
    "waitingArea"
  ).innerHTML = `Waiting for opponent, please share code ${roomUniqueId} to join`;
});
