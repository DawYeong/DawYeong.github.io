window.onload = function() {
  canv = document .getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  document.addEventListener("keyup", displayKeys);
  setInterval(game, 1000/15);
}

let headX = 10, headY = 10, gameScreen = tc = 20, appleX = appleY = 15, nDir = 0, tail = 5, score = 0, highScore = 0;
trail = [];

function game() {
  switch(nDir) {
    case 1:
      headX++;
      break;
    case 2:
      headX--;
      break;
    case 3:
      headY++;
      break;
    case 4:
      headY--;
      break;
  }
    if(headX < 0) {
    headX = tc - 1;
  }
  if(headX > tc - 1) {
    headX = 0;
  }
  if(headY < 0) {
    headY = tc - 1;
  }
  if(headY >tc - 1) {
    headY = 0;
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0,0, canv.width, canv.height);

  ctx.fillStyle = "lime";
  for(let i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gameScreen, trail[i].y * gameScreen, gameScreen - 2, gameScreen - 2);
    if(trail[i].x === headX && trail[i].y === headY) {
      console.log("hit");
      tail = 5;
      if(score > highScore) {
        highScore = score;
      }
      score = 0;
    }
  }

  document.getElementById("score").innerHTML = "High Score: " + highScore + "     Score: " + score;

  trail.push({x:headX, y:headY});
  while(trail.length > tail) {
    trail.shift();
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX * gameScreen, appleY * gameScreen, gameScreen - 2, gameScreen - 2);

  if(appleX === headX && appleY === headY) {
    tail++;
    score++;
    appleX = Math.floor(Math.random() * gameScreen);
    appleY = Math.floor(Math.random() * gameScreen);
  }
}
function keyPush(evt) {
  switch (true){
    case (evt.keyCode === 37 && nDir !== 1):
      nDir = 2;
      console.log("Left");
      break;
    case (evt.keyCode === 38 && nDir !== 3):
      nDir = 4;
      console.log("Down");
      break;
    case (evt.keyCode === 39 && nDir !== 2):
      nDir = 1;
      console.log("Right");
      break;
    case (evt.keyCode === 40 && nDir !==4):
      nDir = 3;
      console.log("Up");
      break;
  }
}


var isEnter = false;
function displayKeys(evt){
  if(evt.keyCode === 13) {
    isEnter = !isEnter;
  }
  if(isEnter) {
    document.getElementById("demo").style.backgroundColor = "red";
    console.log(document.getElementById("demo").value);
    if(document.getElementById("demo").value === "Benny is the Legend Himself") {
      alert("Congratulations, you are either Benny or a legend to know this password.");
      if(confirm("Click ok to enter to the nether realm.")) {
      window.location.href = "https://www.youtube.com/channel/UCC1aXoLn8zzqalZXd58xMQw";
      } else {
        alert("WOW. I thought you were cool but I guess we have a chicken on our hands.");
      }
    }
  } else {
    document.getElementById("demo").style.backgroundColor = "white";
  }
}
