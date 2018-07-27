var fRad, playerPosition, Timer = 0, isStart, nScore = 0;
var isTouchingWall = [4];
var bullets = [];
function setup() {
  var canvas = createCanvas(1200, 700);
  playerPosition = createVector(width/2, height/2, 0);
  fRad = 30;
  for(var i = 0; i < isTouchingWall.length; i++) {
    isTouchingWall[i] = false;
  }
  isStart = false;
}

function draw() {
  background(100, 200, 210);
  if(isStart) {
  ellipse(playerPosition.x, playerPosition.y, fRad);
  move();
  bulletSpawn();
  for(var i = 0; i < bullets.length; i++) {
    bullets[i].move();
    bullets[i].display();
    if(bullets[i].position.x > (width + (bullets[i].bRad/2)) ||
    bullets[i].position.x < -(bullets[i].bRad/2) ||
    bullets[i].position.y > (height + (bullets[i].bRad/2)) ||
    bullets[i].position.y < -(bullets[i].bRad/2)) {
      nScore++;
      bullets.splice(i, 1);
    }
  }
  text(10);
    textAlign(RIGHT, BOTTOM);
  text('Score: ' + nScore, width, height);
  } else {
    textSize(32);
    textAlign(CENTER);
    text('Press Any Key To Start', width/2, height/2);
    if(keyIsPressed === true) {
      isStart = true;
    }
  }
}

function move() {
  if(playerPosition.x >= width - fRad / 2) {
    playerPosition.x = width - fRad/2;
    isTouchingWall[0] = true;
  } else if(playerPosition.x <=  fRad / 2) {
    playerPosition.x = fRad /2;
    isTouchingWall[1] = true;
  } else if(playerPosition.y >= height - fRad /2) {
    playerPosition.y = height - fRad / 2;
    isTouchingWall[2] = true;
  } else if(playerPosition.y <= fRad/2) {
    playerPosition.y = fRad/2;
    isTouchingWall[3] = true;
  }
  if((keyIsDown(65) || keyIsDown(37)) && !isTouchingWall[1]) {
    isTouchingWall[0] = false;
    playerPosition.x -= 2;
    if((keyIsDown(87) || keyIsDown(38)) && !isTouchingWall[3]) {
      isTouchingWall[2] = false;
      playerPosition.y -= 2;
    } else if((keyIsDown(83) || keyIsDown(40)) && !isTouchingWall[2]) {
      isTouchingWall[3] = false;
      playerPosition.y += 2;
    }
  } else if((keyIsDown(68) || keyIsDown(39)) && !isTouchingWall[0]) {
    isTouchingWall[1] = false;
    playerPosition.x += 2;
    if((keyIsDown(87) || keyIsDown(38)) && !isTouchingWall[3]) {
      isTouchingWall[2] = false;
      playerPosition.y -= 2;
    } else if((keyIsDown(83) || keyIsDown(40)) && !isTouchingWall[2]) {
      isTouchingWall[3] = false;
      playerPosition.y += 2;
    }
  } else if((keyIsDown(87) || keyIsDown(38)) && !isTouchingWall[3]) {
    isTouchingWall[2] = false;
    playerPosition.y -= 2;
  } else if((keyIsDown(83) || keyIsDown(40)) && !isTouchingWall[2]) {
    isTouchingWall[3] = false;
    playerPosition.y += 2;
  }
}

function bulletSpawn() {
  Timer ++;
  if(Timer >= 100) {
    bullets.push(new Bullet(playerPosition));
    bullets.push(new Bullet(playerPosition));
    bullets.push(new Bullet(playerPosition));
    bullets.push(new Bullet(playerPosition));
    Timer = 0;
  }
}

function Bullet(tempPosition) {
  this.randomizer = Math.floor(random(0, 4));
  this.bRad = 20;
  switch(this.randomizer) {
    case 0:
      this.position = createVector(0, random(0, height), 0);
      break;
    case 1:
      this.position = createVector(width, random(0, height), 0);
      break;
    case 2:
      this.position = createVector(random(0, width), 0, 0);
      break;
    case 3:
      this.position = createVector(random(0, width), height, 0);
      break;
  }
  this.direction = p5.Vector.sub(tempPosition, this.position);
  this.direction.setMag(3);

  this.move = function() {
    this.position.add(this.direction);
  }

  this.display = function() {
    ellipse(this.position.x, this.position.y, this.bRad);
  }
}






