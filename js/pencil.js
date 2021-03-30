var canvas;
var ctx;
var mouse;
var mode;
var lastX;
var lastY;
var isMouseDown;
var color = '#ff0000';

canvas = document.getElementById('canvas_minipaint');
ctx = this.canvas.getContext("2d");

mouse = {x: 0, y: 0};
isMouseDown = false;

var canvas_wrapper = document.getElementById('canvas_wrapper');
var paintStyle = getComputedStyle(canvas_wrapper);

canvas.width = parseInt(paintStyle.getPropertyValue("width"));
canvas.height = parseInt(paintStyle.getPropertyValue("height"));

ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = color;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var scaleX = (canvas.width / rect.width);
    var scaleY = (canvas.height / rect.height);

     return {
         x : (evt.clientX - rect.left) * scaleX,
         y : (evt.clientY - rect.top) * scaleY
     }
}

var setActive = function() {
    mode = this.getAttribute('id');
    var className  = this.getAttribute("class");

    var elems = document.querySelector(".active");
    if(elems !==null){
        elems.classList.remove("active");
    }
    if (!className.includes('active')){
        this.setAttribute('class', className + ' active');
    }
};

var items = document.getElementsByClassName("item");

for (var i = 0; i < items.length; i++){
    items[i].addEventListener('click', setActive, false);
}

function handleMouseDown(e) {
    var pos = getMousePos(canvas, e);
    mouse.x = pos.x;
    mouse.y = pos.y;

    lastX = mouse.x;
    lastY = mouse.y;
    isMouseDown = true;
}

function handleMouseUp(e) {
    var pos = getMousePos(canvas, e);
    mouse.x = pos.x;
    mouse.y = pos.y;
    isMouseDown = false;
}

function handleMouseOut(e) {
    var pos = getMousePos(canvas, e);
    mouse.x = pos.x;
    mouse.y = pos.y;
    isMouseDown = false;
}

function handleMouseMove(e) {
    var pos = getMousePos(canvas, e);
    mouse.x = pos.x;
    mouse.y = pos.y;

    if (isMouseDown){
        ctx.beginPath();
        switch (mode) {
            case 'pen' :
                ctx.globalCompositeOperation="source-over";
                ctx.moveTo(lastX,lastY);
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
                break;
            case 'eraser':
                ctx.globalCompositeOperation="destination-out";
                ctx.arc(lastX, lastY,8,0,2 * Math.PI,false);
                ctx.fill();
                break;
            default :
                break;
        }

        lastX = mouse.x;
        lastY = mouse.y;
    }
}

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('mouseout', handleMouseOut, false);
canvas.addEventListener('mousemove', handleMouseMove, false);