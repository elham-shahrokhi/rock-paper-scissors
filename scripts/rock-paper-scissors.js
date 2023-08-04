//the JavaScript file for the rock-paper-scissors project is here.

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

//so using local storage, we were able to get the value that we saved earlier even though we refresh the page.
/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/
//!score===null

//in the perivius code, there were 3 same part. we can use function to became the code shorter.

// (scop): any variable we create inside curly brackets {...} will only exist inside the curly brackets {...}.
//scope limits where a variable exists.

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
    // arrow function.
    intervalId = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoPlaying = true;
  } else{
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button').addEventListener('click', ()=>{
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', ()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
  playGame('scissors');
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    //score.wins = score.wins + 1;
    score.wins += 1;
  } else if (result === "You lose.") {
    //score.losses = score.losses +1
    score.losses += 1;
  } else if (result === "Tie.") {
    //score.ties = score.ties +1
    score.ties += 1;
  }
  //local storage only supports the strings.
  localStorage.setItem("score", JSON.stringify(score));

  //we update the scores on popup and now we have to update on the page.
  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon" />
<img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer`;

  /*
  alert(
    `You picked ${playerMove} . Computer picked ${computerMove}. ${result}
Wins : ${score.wins} , Losses :${score.losses} , Ties: ${score.ties}`
  );
  */
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
  // after return function close!
  // when we use a return statement, it ends the function immediately.
}