"use strict";
const points = document.querySelector("#points");
const lives = document.querySelector("#lives");

let gameKey = {
  sprite: "images/Key.png",
  posX: 200,
  posY: -10
};

// function info(){
//     var infoModal = document.querySelector('.info-modal');
//     infoModal.style.visibility = 'visible';
//     gameMessages.message('instructions');
// }


const gameMessages = {
  win: "Congrats! You Found The Magic Key",
  lost: "You Lost! You Are In Heaven Now",
//   instructions:
//     "The game is pretty simple, all you have to do is get the most number of gems until the timer reaches zero for you to get the magic key, but beware of the evil bugs they will suck you life and you only have two, no cat life expectancy here so be careful :-)",
//   about:
//     "The game was created by Leonel Meque a Computer Science Engineer and Front-End Developer.",
   message: function (info) {
    var modalHeaderContent = document.querySelectorAll(".message");
    var modalParagraphContent = document.querySelectorAll(".info");
    switch (info) {
      case "win":
        modalHeaderContent.textContent = this.win;
        break;
      case "lost":
        modalHeaderContent.textContent = this.lost;
        break;
    //   case "instructions":
    //     modalHeaderContent.textContent = "Game Instructions";
    //     modalParagraphContent.textContent = this.instructions;
    //     break;
    //   case "about":
    //     modalHeaderContent.textContent = "About This Game";
    //     modalParagraphContent.textContent = this.about;
    }
  }
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
  if (
    player.positionX === gameKey.posX &&
    player.positionY === gameKey.posY &&
    showKey === true
  ) {
   
    player.win = true;
    modal.style.visibility = "visible";
    gameMessages.message('win');
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
          setTimeout(() => {
            createGem(i, gemController);
          }, 200 * i);
        })();
      }
    }, 500);
    gemController += 1;
    return gemController;
  };
}
