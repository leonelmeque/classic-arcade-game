"use strict";

function Enemy() {
  
  this.sprite = "images/enemy-bug.png";
  this.positionX = 0;
  this.positionY = 0;
  this.speed = 0;
  this.timer = 0;

  // Generates bugs speed
  this.bugSpeed = function() {
    var speed = Math.floor(Math.random() * 10),
      free = false;
    while (!free) {
      if (speed > 2) {
        free = true;
        return speed;
      } else {
        speed = Math.floor(Math.random() * 20);
      }
    }
  };

  // Moves bugs in the canvas
  this.moveLoop = width => {
    if (this.positionX < width) {
      this.positionX++;
      collision(this.positionX, this.positionY, this.timer);
    } else {
      clearInterval(this.timer);
      this.positionX = -50;
      switchPositionY(this.positionX);
      this.move();
    }
  };

  //stats the move interval
  this.move = () => {
    this.timer = setInterval(this.moveLoop, this.bugSpeed(), canvas.width);
  };
}

// Player class
let Player = function() {
  this.sprite = "images/char-boy.png";
  this.positionX = 200;
  this.positionY = 400;
  this.life = 2;
  this.points = 0;
  this.win = false;
};

/* I used this function to make my collisions more precise
   this function uses the Pythagorean Theorem, I one had teach who told me:
   if you want to develop video games you need to know a lot of math and physics
   function source: https://www.youtube.com/watch?v=XYzA_kPWyJ8
*/
function getDistance(pX, pY, enX, enY) {
  let xDistance = enX - pX,
    yDistance = enY - pY;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Changes the postion of the bugs in he game
var switchPositionY = function(positionX) {
  var position = [50, 145, 225];
  shuffle(position);
  if (allEnemies[0].positionX === positionX) {
    allEnemies[0].positionY = position[2];
  } else if (allEnemies[1].positionX === positionX) {
    allEnemies[1].positionY = position[1];
  } else if (allEnemies[2].positionX === positionX) {
    allEnemies[2].positionY = position[0];
  }
};

// Detecs collisions of the game
function collision(posX, posY, timer) {
  let number = getDistance(player.positionX, player.positionY, posX, posY);
  if (number < 60 && player.life != 0) {
    player.positionX = 200;
    player.positionY = 400;
    player.life--;
    lives.removeChild(lives.childNodes[player.life]);
    
   
  } else if (player.life === 0) {
    lives.removeChild(lives.childNodes[player.life]);
    var modal = document.querySelector(".modal");
    modal.style.visibility = "visible";
    gameMessages.message("lost");
    
    clearInterval(timer);
    clearTimeout(stopTime);
    allEnemies = [];
    allGems = [];
  } else if (player.life != 0 && showKey === true && player.win != false) {
    clearInterval(timer);
    allEnemies = [];
  }
}

gameKey.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
};


Enemy.prototype.update = function(dt) {
  
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  this.speed = dt;
};


Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};
Gems.prototype.update = function(dt) {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
  this.speed = dt;
};

Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY, 80, 80);
};

Player.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

// Helps Player move around the game
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case "right":
      if (this.positionX < canvasLimits(direction)) this.positionX += 100;
      break;
    case "left":
      if (this.positionX > canvasLimits(direction)) this.positionX -= 100;
      break;
    case "up":
      if (this.positionY > canvasLimits(direction)) this.positionY -= 82;
      break;
    case "down":
      if (this.positionY < canvasLimits(direction)) this.positionY += 82;
      break;
    default:
      break;
  }
  gemCollision();
};

// Canvas Limits 
function canvasLimits(direction) {
  var result = 0;
  if (direction === "right") {
    result = canvas.width - canvas.width * 0.25;
    return result;
  } else if (direction === "down") {
    result = canvas.height - canvas.height * 0.35;
    return result;
  }
  return result;
}

// Variables of the game
var enemy,
    gameLoad,
    allEnemies = [],
    allGems = [],
    mapArray = [];
var canvas = document.querySelector("canvas");
var player = new Player();
let addMoreGems = newGems(),
    stopTime,
    timer, 
    seconds = 60, 
    showKey=false;

//IIFI that starts the timer of the game
(timer = function timerTrigger() {
  seconds--;
  document.getElementById("timer").innerHTML = seconds + " s";

  if (seconds != 0) {
    stopTime = setTimeout(timerTrigger, 1000);
  } else {
    showKey = true;
    allGems = [];
    clearTimeout(stopTime);
  }
})();

// This function helps creating the gems of the game
function createGem(index, controller) {
  var gemColor = ["Blue", "Green", "Orange"];
  if (showKey !== true) {
    var gems = new Gems("Blue");
    gems.posX = mapArray[index].x;
    gems.posY = mapArray[index].y;
    if (controller == 1) {
      gems.sprite = "images/GemGreen.png";
    } else if (controller > 2) {
      shuffle(gemColor);
      gems.sprite = `images/Gem${gemColor[0]}.png`;
    }

    allGems.push(gems);
  }
}
// Game restart
function restartGame() {
  var modal = document.querySelector(".modal");
  var img = document.createElement('img');
  var img2 = document.createElement('img');
  img.setAttribute('src','images/Heart.png');
  img2.setAttribute('src','images/Heart.png');
  modal.style.visibility = "hidden";
  clearTimeout(stopTime);
  lives.appendChild(img);
  lives.appendChild(img2);
  showKey = false;
  seconds = 60;
  points.textContent = 0;
  timer();
  gameLoad();
  player = new Player();
  allEnemies.forEach(object => {
    object.move();
  });
}

//IIFI to load the Gems coordinates 
(function loadCoordinates() {
  var x = 10,
    y = [120, 200, 285];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      mapArray.push(new Coordinates(x, y[row]));
      x += 100;
      if (x > 410) {
        x = 10;
      }
    }
  }
})();

// IIFI that loads the enemies and the gems
(gameLoad = function loadEnemiesAndGems() {
  var count = 0;

  while (count <= 2) {
    enemy = new Enemy();
    switch (count) {
      case 0:
        enemy.positionY = 70;
        break;
      case 1:
        enemy.positionY = 150;
        break;
      case 2:
        enemy.positionY = 240;
        break;
    }
    allEnemies.push(enemy);
    count++;
  }

  count = 0;
  shuffle(mapArray);
  while (count < 8) {
    createGem(count);
    count++;
  }
})();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


// Triggers enemy movement
allEnemies.forEach(object => {
  object.move();
});
