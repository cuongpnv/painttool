var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var pen_eraser = document.getElementById('canvas-area');
var paintStyle = getComputedStyle(pen_eraser);
var mode = 'pen';

canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#FF0000';

canvas.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener("mousemove", onPaint, false);
}, false);

canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener("mousemove", onPaint, false);
}, false);

var onPaint = function () {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

var pen = document.getElementById("pen");
pen.addEventListener('click', function (e) {
    mode = "pen";
    alert(mode)
}, false);

var eraser = document.getElementById("eraser");
eraser.addEventListener('click', function (e) {
    mode = "eraser";
    alert(mode)
}, false);