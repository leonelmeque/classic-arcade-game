// Enemies our player must avoid
function Enemy(){
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
    var speed = Math.floor(Math.random()*10),
        temp=0,
        free = false;
          while(!free){
            
            if(speed!==0){
                free=true;
               
                return speed;
              }else{
                 speed = Math.floor(Math.random()*20);
                
              }
             
        }
  };
  this.moveLoop=(width)=>{
    if(this.positionX<width){
      this.positionX++;
      }else{
      clearInterval(this.timer);
      this.positionX = -50;
      switchPositionY(this.positionY);
      this.move();
    }
  };

  this.move=()=>{
    this.timer = setInterval(this.moveLoop,bugSpeed(),canvas.width);
  };
  
}


var switchPositionY =  function (positionY){
    
    if(allEnemies[0].positionY===positionY){
      console.log('time for a switch');
    }
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
      if (this.positionX < canvasLimits(direction)) this.positionX += 100;
      break;
    case "left":
        if (this.positionX > canvasLimits(direction))  this.positionX -= 100;
      break;
    case "up":
        if (this.positionY > canvasLimits(direction))  this.positionY -= 85;
      break;
    case "down":
        if (this.positionY < canvasLimits(direction))   this.positionY += 85;
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
    console.log(result);
    return result;
  }
  return result;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy;
var allEnemies = [];
var canvas = document.querySelector("canvas");
var player = new Player();

(function loadEnemies() {
  var count = 0;

  while (count <= 2) {
    enemy = new Enemy();
    switch (count) {
      case 0:
        enemy.positionY = 50;
        break;
      case 1:
        enemy.positionY = 140;
        break;
      case 2:
        enemy.positionY = 230;
        break;
    }
    allEnemies.push(enemy);
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

allEnemies.forEach((object)=>{
    object.move();
    
});
(function turnOnEnemies() {
  
})();
