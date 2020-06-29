// select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

// create the user paddle
const user = {
  x: 0,
  y: cvs.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0
}

// create the com paddle
const com = {
  x: cvs.width - 10,
  y: cvs.height/2 - 100/2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0
}

// create the ball
const ball = {
  x: cvs.width/2,
  y: cvs.height/2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE"
}

// draw rect function
function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

drawRect(0,0,cvs.width, cvs.height, "BLACK");

// draw circle function
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

drawCircle(100, 100, 10, "WHITE");

// draw text function
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px HELVETICA";
  ctx.fillText(text, x, y);
}

drawText("something", 300, 200, "WHITE");
