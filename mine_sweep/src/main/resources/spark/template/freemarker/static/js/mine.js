const ID_MAX = 999999;
const ID_MIN = 100000;

const SIZE = 31;
const LENGTH = 32;
const BLOCK_WIDTH = SIZE * LENGTH;
const BLOCK_HEIGHT = SIZE * LENGTH;
const NAV_HEIGHT = 64;

const VAL_INVISIBLE = 0;
const VAL_VISIBLE = 1;
const VAL_OWNED = 2;
const STYLE_INVISIBLE = "#000000";
const STYLE_SWEPT = "#e0e0e0";
const STYLE_UNSWEPT = "#9e9e9e";
const STYLE_FLAG = "#ff0000";

var idUser;
var idRoom;
var webSocket;
var grids;
var canvas;
var context;

function start() {
    idUser = Math.floor(Math.random() * (ID_MAX - ID_MIN + 1)) + ID_MIN;
    document.getElementById("ID").value = idUser.toString();
}

function setupSocket() {
    if (webSocket == undefined || webSocket.readyState !== WebSocket.CLOSED) {
        webSocket = new WebSocket("ws://localhost:4000/");
    }
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

function drawBoard() {
    for (var x = 0; x <= BLOCK_WIDTH; x += LENGTH) {
        context.moveTo(x + LENGTH, LENGTH);
        context.lineTo(x + LENGTH, BLOCK_HEIGHT + LENGTH);
    }

    for (var y = 0; y <= BLOCK_HEIGHT; y += LENGTH) {
        context.moveTo(LENGTH, y + LENGTH);
        context.lineTo(BLOCK_WIDTH + LENGTH, y + LENGTH);
    }

    context.strokeStyle = "black";
    context.stroke();
}

function isInRange(row, col) {
    return (row >= 0 && row < SIZE && col >= 0 && col < SIZE);
}

function changeState(row, col, newState) {
    newState = parseInt(newState);
    console.log(newState >= 0 && newState < 16);
    return false;
}

function explore(row, col) {
    var newRow;
    var newCol;
    for (var i = -1; i < 2; i++) {
        newRow = row + i;
        for (var j = -1; j < 2; j++) {
            newCol = col + j;
            if (isInRange(newRow, newCol, SIZE)) {
                changeColor(newRow, newCol, STYLE_UNSWEPT);
            }
        }
    }
    changeColor(row, col, STYLE_SWEPT);
}

function makeFlag(row, col) {
    var myImg = new Image();
    myImg.onload = function() {
        var myPtn = context.createPattern(this, "repeat");
        context.fillStyle = myPtn;
        context.fillRect((col + 1) * LENGTH, (row + 1) * LENGTH, LENGTH, LENGTH);
        context.fill();
    };
    myImg.src = "static/css/flag.png";
}

function changeColor(row, col, style) {
    context.fillStyle = style;
    context.fillRect((col + 1) * LENGTH, (row + 1) * LENGTH, LENGTH, LENGTH);
}

function handleClick(evt) {
    var col = parseInt(parseInt(evt.pageX.toString()) / LENGTH) - 1;
    var row = parseInt(parseInt(evt.pageY.toString() - NAV_HEIGHT) / LENGTH) - 1;
    if (isInRange(row, col)) {
        var curr = grids[row][col];
        if (evt.which == 1) {
            if ((!curr.isVisible) || curr.isSwept || curr.isFlag)
                console.log("should not respond");
            explore(row, col);
        } else if (evt.which == 3) {
            makeFlag(row, col);
        }
    }
}

function handleMenu(evt) {
    var col = parseInt(parseInt(evt.pageX.toString()) / LENGTH) - 1;
    var row = parseInt(parseInt(evt.pageY.toString() - NAV_HEIGHT) / LENGTH) - 1;
    if (isInRange(row, col))
        evt.preventDefault();
}

function init() {
    // switch div
    document.getElementById("divOne").style.display = "none";
    document.getElementById("divThree").style.display = "block";
    // instantiate array
    grids = new Array(SIZE);
    for (var i = 0; i < SIZE; i++) {
        grids[i] = new Array(SIZE);
        for (var j = 0; j < SIZE; j++) {
            grids[i][j] = {
                x: i,
                y: j,
                mine: false,
                visible: false,
                swept: false,
                flag: false
            }
        }
    }

    canvas = $('<canvas/>').attr({
        width: BLOCK_WIDTH + 2 * LENGTH,
        height: BLOCK_HEIGHT + 2 * LENGTH
    }).appendTo('body');
    context = canvas.get(0).getContext("2d");

    drawBoard();

    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("contextmenu", handleMenu, false);
}