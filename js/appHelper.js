"use strict"
let points = document.querySelector("#points");
let lives = document.querySelector("#lives");

let gameKey = {
    sprite: "images/Key.png",
    posX: 200,
    posY: -10
  };

  function Gems(gemName) {
  this.sprite = `images/Gem${gemName}.png`;
  this.points = function() {
    if (this.sprite === "images/GemBlue.png") {
      return 50;
    } else if (this.sprite === "images/GemGreen.png") {
      return 100;
    } else if (this.sprite === "images/GemOrange.png") {
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

function restartGame(){
    var modal = document.querySelector(".modal");
    modal.style.visibility = "hidden";
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

  function keyCollision() {
    var modal = document.querySelector(".modal");
    if (player.positionX === gameKey.posX && player.positionY === gameKey.posY) {
      player.win = true;
      modal.style.visibility = "visible";
    }
  }

  function gemCollision() {
    if (player.positionY === 72) {
      gemCollisionHelper(120);
    } else if (player.positionY === 154) {
      gemCollisionHelper(200);
    } else if (player.positionY === 236) {
      gemCollisionHelper(285);
    } else if (player.positionY === -10) {
      keyCollision();
    }
  }
  
  function gemCollisionHelper(posY) {
    for (let col = 0; col < allGems.length; col++) {
      if (
        player.positionX + 10 === allGems[col].posX &&
        posY === allGems[col].posY
      ) {
        player.points += allGems[col].points();
        points.textContent = player.points;
        allGems.splice(col, 1);
        if (allGems.length === 0 && player.life != 0) {
          player.positionY = 400;
          addMoreGems();
        }
      }
    }
  }
  
  function newGems() {
  let gemController = 0;
  shuffle(mapArray);
  return function() {
    setTimeout(() => {
      for (let i = 0; i < 8; i++) {
       
          if (i < 0) {
            createGem(i, gemController);
          }
  
          (function() {
            factoryStop = setTimeout(() => {
              createGem(i, gemController);
            }, 200 * i);
          })();
        }
        
      
    }, 500);

    gemController += 1;

    return gemController;
  };
}