var order = []; //  Game generates order of sequence
var playerOrder = []; // Player pressing the lights
var flash; // it will keep record of number of flashed
var turn; // turn counter
var good; // boolean condition to check if player hit right colors
var compTurn; // to check if computer turn should be ON or OFF
var intervalId; // to control SetInterval function
var strict = false; // game has strict Mode functionality
var noise = true; // To generate sound
var on = false; // Game is turned off in the start.
var win; // if the game is won or not

// **************** All Selectors *************

let turnCounter = document.querySelector("#turn");
let topLeft = document.querySelector("#box-topleft");
let topRight = document.querySelector("#box-topright");
let bottomLeft = document.querySelector("#box-bottomleft");
let bottomRight = document.querySelector("#box-bottomright");
let strictButton = document.querySelector("#strict");
let onButton = document.querySelector("#switch");
let startButton = document.querySelector("#start");

// ************** Ristrict Mode ON/OFF *********

strictButton.addEventListener("click", function (e) {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

// ************ Game ON / OFF func **********
onButton.addEventListener("click", function (e) {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

//      Start the game
startButton.addEventListener("click", event => {
  if (on || win) {
    play();
  }
});

//   MAIN function to Play the game
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 10; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

//  computer will play all colors with sequence
function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

//     Top left color with sound
function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "palegreen";
}

//     Top right color with sound
function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "orangered";
}

//     bottom left color with sound
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "rgb(255, 255, 102)";
}

//     bottom right color with sound
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "seagreen";
  topRight.style.backgroundColor = "firebrick";
  bottomLeft.style.backgroundColor = "#cccc00";
  bottomRight.style.backgroundColor = "royalblue";
}

// If player hits wrong color it will flash
function flashColor() {
  topLeft.style.backgroundColor = "palegreen";
  topRight.style.backgroundColor = "orangered";
  bottomLeft.style.backgroundColor = "rgb(255, 255, 102)";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener("click", event => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener("click", event => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener("click", event => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener("click", event => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

// Checking if player did hit all the right colors
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 10 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "WRONG!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

// This function will invoke if game is won
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

// icon to display / hide information about game
let btn = document.querySelector(".click");
let info = document.querySelector("#info");

btn.addEventListener("click", function () {
  info.classList.toggle("move");
});
