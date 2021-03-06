var fRad, playerPosition, Timer = 0, isStart, nScore = 0, nHighScore = 0, BulletSpeed = 3;
var isSpeedChanged = false;
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
    fill(249, 172, 57);
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
    if(playerPosition.x - (fRad / 2) <= bullets[i].position.x + (bullets[i].bRad/2) &&
    playerPosition.x + (fRad /2) >= bullets[i].position.x - (bullets[i].bRad/2) &&
    playerPosition.y - (fRad /2) <= bullets[i].position.y + (bullets[i].bRad/2) &&
    playerPosition.y + (fRad/2) >= bullets[i].position.y - (bullets[i].bRad/2)) {
      isStart = false;
      break;
    }
  }
  text(10);
    textAlign(RIGHT, BOTTOM);
    fill(255);
  text('Score: ' + nScore, width, height);
  } else {
    if(nScore > nHighScore) {
      nHighScore = nScore;
    }
    bullets.splice(0, bullets.length);
    playerPosition.x = width/2;
    playerPosition.y = height/2;
    nScore = 0;
    textSize(32);
    textAlign(CENTER);
    fill(255);
    text('Press Space To Start', width/2, height/2);
    if(keyIsPressed === true && keyCode === 32) {
      isStart = true;
    }
  }
  text(10);
  textAlign(LEFT,BOTTOM);
  fill(255);
  text('High Score: ' + nHighScore, 0, height);
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
    bullets.push(new Bullet(playerPosition, BulletSpeed));
    bullets.push(new Bullet(playerPosition, BulletSpeed));
    bullets.push(new Bullet(playerPosition, BulletSpeed));
    bullets.push(new Bullet(playerPosition, BulletSpeed));
    Timer = 0;
  }
}

function Bullet(tempPosition, tempSpeed) {
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
  this.direction.setMag(tempSpeed);

  this.move = function() {
    this.position.add(this.direction);
  }

  this.display = function() {
    fill(0);
    ellipse(this.position.x, this.position.y, this.bRad);
  }
}






