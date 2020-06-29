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

// draw circle function
function drawCircle(x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fill();
}

// draw text function
function drawText(text, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = "45px HELVETICA";
  ctx.fillText(text, x, y);
}

// render the game
function render() {
  // clear the canvas
  drawRect(0,0,cvs.width, cvs.height, "BLACK");

  // draw the net
  drawNet();

  // draw score
  drawText(user.score, cvs.width/4, cvs.height/5, "WHITE");
  drawText(user.score, 3 * cvs.width/4, cvs.height/5, "WHITE");

  // draw the user and com paddle
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);

  // draw the circle
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
