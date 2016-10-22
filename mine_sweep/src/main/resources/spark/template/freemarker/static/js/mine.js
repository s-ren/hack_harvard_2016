var idUser;
var idRoom;
var webSocket;
var grids;
const ID_MAX = 999999;
const ID_MIN = 100000;
const SIZE = 31;

function start() {
    idUser = Math.floor(Math.random() * (ID_MAX - ID_MIN + 1)) + ID_MIN;
    document.getElementById("ID").value = idUser.toString();
}

function setupSocket() {
    if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
        return;
    }
    webSocket = new WebSocket("ws://localhost:4000/");
}

function joinRoom() {
    document.getElementById("divOne").style.display = "none";
    document.getElementById("divTwo").style.display = "block";
    setupSocket();
    idRoom = document.getElementById("room").value;
    webSocket.send({
        roomID: idRoom,
        userID: idUser
    });

}

function init() {
    grids = new Array(SIZE);
    for (var i = 0; i < SIZE; i++) {
        grids[i] = new Array(SIZE);
        for (var j = 0; j < SIZE; j++) {
            grids[i][j] = {
                x: i,
                y: j,
                mine: false,
                visible: false
            }
        }
    }
}