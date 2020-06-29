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

// create the net
const net = {
  x: (cvs.width - 2)/2,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE"
}

// draw net function
function drawNet() {
  for (let i = 0; i <= cvs.height; i+=15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
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

  // draw the user score to the left
  drawText(user.score, cvs.width/4, cvs.height/5, "WHITE");

  // draw the com score to the right
  drawText(com.score, 3 * cvs.width/4, cvs.height/5, "WHITE");

  // draw the user paddle
  drawRect(user.x, user.y, user.width, user.height, user.color);

  // draw the com paddle
  drawRect(com.x, com.y, com.width, com.height, com.color);

  // draw the circle
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// control the user paddle
cvs.addEventListener("mousemove", movePaddle);
function movePaddle(event) {
  let rect = cvs.getBoundingClientRect();
  user.y = event.clientY - rect.top - user.height/2;
}


// collision detection of ball and paddles
function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y -b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// reset ball function
function resetBall() {
  ball.x = cvs.width/2;
  ball.y = cvs.height/2;

  
}

// update function, that does all calculation
function update() {
  // the ball's velocity
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // simple AI to control the com paddle
  let computerLevel = 0.1;
  com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

  // when the ball collides with the bottom and top walls, the the y velocity is inversed
  if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }

  // check if the ball hits the user or com paddle
  let player = (ball.x + ball.radius < cvs.width/2) ? user : com;

  // if the ball hits a paddle
  if(collision(ball, player)) {
    // check where the ball hits the paddle
    let collidePoint = ball.y - (player.y + player.height/2);
    // normalize value of collidePoint to get numbers between -1 and 1
    // -player.height/2 < collide Point < player.height/2
    collidePoint = collidePoint / (player.height/2);
    // calculate angle in radian
    // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
    // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
    // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
    // Math.PI/4 = 45 degrees
    let angleRad = (Math.PI/4) * collidePoint;

    // X direction of the ball when it is hit
    let direction = (ball.x < cvs.width/2) ? 1 : -1;

    // change the X and Y velocity direction
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = ball.speed * Math.sin(angleRad);

    // speed up the ball everytime a paddle hits it
    ball.speed += 0.1;
  }
  // update the scoreboard
  if (ball.x - ball.radius < 0) {
    // com wins
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > cvs.width) {
    // user wins
    user.score++;
    resetBall();
  }

}


// game function
function game() {
  update();
  render();
}

// number of frames per second
let framePerSecond = 50;

// call the game function 50 times every 1 second
setInterval(game, 1000/framePerSecond);
