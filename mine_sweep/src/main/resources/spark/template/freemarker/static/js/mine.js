const ID_MAX = 999999;
const ID_MIN = 100000;
const SIZE = 31;
const VAL_VISIBLE = 0;
const STYLE_INVISIBLE = "#000000";
const STYLE_SWEPT = "#e0e0e0";
const STYLE_UNSWETPT = "#757575";
var idUser;
var idRoom;
var webSocket;
var grids;

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
    // switch div
    document.getElementById("divOne").style.display = "none";
    document.getElementById("divTwo").style.display = "block";
    idRoom = document.getElementById("room").value;
    // connect to back end
    setupSocket();
    webSocket.send({
        roomID: idRoom,
        userID: idUser
    });

}

function init() {
    // instantiate array
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

function isInRange(x, y, SIZE) {
    return (x >= 0 && x < SIZE && y >= 0 && y < SIZE);
}

function changeState(x, y, newState) {
    return false;
}

function explore(x, y) {
    var newX;
    var newY;
    for (var i = -1; i < 2; i++) {
        newX = x + i;
        for (var j = -1; j < 2; j++) {
            newY = y + j;
            if (isInRange(newX, newY, SIZE)) {
                changeState(x, y, VAL_VISIBLE);
            }
        }
    }
}