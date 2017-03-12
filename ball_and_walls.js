window.onload = function () {
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext('2d');

    window.mass = 10;
    window.F = 10;
    window.G = 10;

    window.xSpeed = 1;
    window.ySpeed = 4;

    window.x = 20;
    window.y = 20;
    window.radius = 20;
    window.timeStep = 0.04;

    var fps = 400;
    setInterval(drawScene, 1000/fps, context);
};

function drawBorder(context) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(800, 0);
    context.lineTo(800, 600);
    context.lineTo(0, 600);
    context.lineTo(0, 0);
    context.strokeStyle = 'black';
    context.stroke();
}

function drawCircle(context) {
    context.beginPath();
    context.arc(window.x, window.y, window.radius, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
    context.stroke();
}

function clearCanvas(context) {
    context.clearRect(0, 0, 800, 600);
}

function getNewCoordinateY() {
    window.ySpeed = (window.ySpeed + getSpeedDelta());
    window.y = window.y + window.ySpeed * window.timeStep;
    if (window.y > (600 - window.radius)) {
        window.y = 600 - window.radius;
    }
}

function getNewCoordinateX(currentCoordinate, speed) {
    return currentCoordinate  + speed;
}

function getSpeedDelta() {
    // v = a * t
    return window.G * window.timeStep;
}

function drawScene(context) {

    clearCanvas(context);
    drawBorder(context);
    window.x = getNewCoordinateX(window.x, window.xSpeed);
    getNewCoordinateY();
    if ((window.y + window.radius) >= 600 || (window.y - window.radius) <= 0) {
        window.ySpeed = window.ySpeed * 0.9;
        window.xSpeed = window.xSpeed * 0.9;
        window.ySpeed = window.ySpeed * -1;
        getNewCoordinateY();
    }
    if ((window.x + window.radius) >= 800 || (window.x - window.radius) <= 0) {
        window.xSpeed = window.xSpeed * -1;
        window.x = getNewCoordinateX(window.x, window.xSpeed);
    }
    drawCircle(context, window.x, window.y);
}