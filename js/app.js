// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.positionX = 0;
  this.positionY = 0;
  this.speed = 0;
};

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
      this.positionX += 100;
      break;
    case "left":
      this.positionX -= 100;
      break;
    case "up":
      this.positionY -= 85;
      break;
    case "down":
      this.positionY += 85;
      break;
    default:
      break;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy; 
var allEnemies = [];

var player = new Player();

(function loadEnemies(){
    var count = 0;
    var posX = 50;
    while(count<=2){
        enemy = new Enemy();
        switch(count){
            case 0 : enemy.positionY = 50;break;
            case 1 : enemy.positionY = 140;break;
            case 2 : enemy.positionY = 230; break;
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

function moveEnemies(pos){
    allEnemies[pos].positionX+=allEnemies[pos].speed;
}

(function turnOnEnemies(){ 
    setInterval(moveEnemies,allEnemies[0].speed,0);
    console.log(allEnemies[1].speed);
    setInterval(moveEnemies,allEnemies[1].speed,1);
    setInterval(moveEnemies,allEnemies[2].speed,2); 
})();