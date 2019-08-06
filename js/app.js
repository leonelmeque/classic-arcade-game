// Enemies our player must avoid
function Enemy() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.positionX = 0;
  this.positionY = 0;
  this.speed = 0;
  this.timer = 0;

  bugSpeed = function() {
    var speed = Math.floor(Math.random() * 10),
      temp = 0,
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

  this.moveLoop = width => {
    if (this.positionX < width) {
      this.positionX++;
      collision(this.positionX, this.positionY);
    } else {
      clearInterval(this.timer);
      this.positionX = -50;
      switchPositionY(this.positionX);
      this.move();
    }
  };

  this.move = () => {
    this.timer = setInterval(this.moveLoop, bugSpeed(), canvas.width);
  };
}
/* I used this function to make my collisions more precise
   this function uses the Pythagorean Theorem, I one had teach who told me:
   if you want to develop video games you need to know a lot of math and physics
   function source: https://www.youtube.com/watch?v=XYzA_kPWyJ8
*/
function Gems() {
  this.sprite = "images/GemBlue.png";
  this.points = function() {
    if (type === "Blue") {
      return 50;
    } else if (type === "Green") {
      return 100;
    } else if (type === "Orange") {
      return 350;
    }
  };
  this.posX = 0;
  this.posY = 0;
}

function Coordinates(x, y) {
  this.x = x;
  this.y = y;
}

function getDistance(pX, pY, enX, enY) {
  let xDistance = enX - pX,
    yDistance = enY - pY;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

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

function collision(posX, posY) {
  let number = getDistance(player.positionX, player.positionY, posX, posY);
  if (number < 60) {
    player.positionX = 200;
    player.positionY = 400;
  }
}

function gemCollision(){
  

  var count=0, mapPosX,mapPosY=[72,154,236];
  const place = mapArray.filter(function(object) {
       
      mapPosX = object.x - 10;
      
    if(player.positionX===mapPosX && player.positionY===mapPosY[count]){
      console.log(player.positionY);
      return object;
    }
    count++;
    if(count===3){
      count=0;
    }
   
  } )
  console.log(place);
  // mapArray.forEach(function checkPosition(object){
  //   mapPosX = object.x - 10;
  //    if(player.positionX===mapPosX && player.positionY===mapPosY[count]){
      
  //       for(let gem of allGems){
                      
  //         if(gem.posX===object.x && gem.posY===object.y){
  //           console.log("Player position iquals "+object.x+' and '+object.y);
  //           console.log("Collision of gem");
  //           break;
  //         }
  //         count++;
  //         if(count===3){
  //           console.log("Player Y value "+count);
  //           break;
  //         }
  //       }
  //    }
     
  // })
 
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
  this.speed = dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};
Gems.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY);
  this.speed = dt;
};

Gems.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.posX, this.posY, 80, 80);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function() {
  this.sprite = "images/char-boy.png";
  this.positionX = 200;
  this.positionY = 400;
};

Player.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.positionX, this.positionY);
};

Player.prototype.handleInput = function(direction) {
  
  switch (direction) {
    case "right":
      // console.log(getDistance(this.positionX,this.positionY,allGems[0].posX,allGems[0].posY));
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
 
};

// Canvas Limits expressions
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
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy;
var gems;
var allEnemies = [];
var allGems = [];
var mapArray = [];
var canvas = document.querySelector("canvas");
var player = new Player();

(function loadCoordinates() {
  var x = 10,
  y = [120, 200, 285];

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
      // console.log("position X: " + x + " position Y: " + y[row]);
      mapArray.push(new Coordinates(x, y[row]));
      x += 100;
      if (x > 410) {
        x = 10;
      }
    }
  }
  // console.log(mapArray);
})();

(function loadEnemiesAndGems() {
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
    gems = new Gems();
    gems.posX = mapArray[count].x;
    gems.posY = mapArray[count].y;
    allGems.push(gems);
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
  gemCollision();
});

allEnemies.forEach(object => {
  object.move();
});
