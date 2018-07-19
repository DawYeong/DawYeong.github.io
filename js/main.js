window.onload = function() {
  canv = document .getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  document.addEventListener("keyup", displayKeys);
  setInterval(game, 1000/15);
}
px=py = 10;
gs = tc = 20;
ax = ay = 15;
xv= yv =0;
trail = [];
tail = 5;
isEnter = false;
let nDir = 0;
// 1 - right, 2 - left, 3 - up, 4 - down
function game() {
  px += xv;
  py += yv;
  if(px < 0) {
    px = tc;
  }
  if(px > tc) {
    px = 0;
  }
  if(py < 0) {
    py = tc;
  }
  if(py >tc) {
    py = 0;
  }
  ctx.fillStyle ="white";
  ctx.fillRect(0,0, canv.width, canv.height);

  ctx.fillStyle ="lime";
  for(var i = 0 ; i < trail.length; i ++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs -2, gs-2);
    if(trail[i].x === px && trail[i].x === py) {
      tail = 5;
    }
  }
  trail.push({x:px, y:py});
  while(trail.length > tail) {
    trail.shift();
  }

  if(ax === px && ay === py) {
    tail++;
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }
  ctx.fillStyle ="red";
  ctx.fillRect(ax*gs, ay*gs, gs-2, gs-2);
}
function keyPush(evt) {
  switch (true){
    case (evt.keyCode === 37 && nDir !== 1):
      nDir = 2;
      xv = -1, yv = 0;
      console.log("Left");
      break;
    case (evt.keyCode === 38 && nDir !== 3):
      nDir = 4;
      xv = 0, yv = -1;
      console.log("Down");
      break;
    case (evt.keyCode === 39 && nDir !== 2):
      nDir = 1;
      xv = 1, yv = 0;
      console.log("Right");
      break;
    case (evt.keyCode === 40 && nDir !==4):
      nDir = 3;
      xv = 0, yv = 1;
      console.log("Up");
      break;
  }
}
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
