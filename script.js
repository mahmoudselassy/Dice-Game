"use strict";
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
const p1ScoreElement = document.querySelector("#score--0");
const p1CurrentScoreElement = document.querySelector("#current--0");
const p2ScoreElement = document.querySelector("#score--1");
const p2CurrentScoreElement = document.querySelector("#current--1");
let p1Score = 0;
let p1CurrentScore = 0;
let p1Active = document.querySelector(".player--0").classList.contains("player--active");
let p2Score = 0;
let p2CurrentScore = 0;
let p2Active = document.querySelector(".player--1").classList.contains("player--active");
let winScore = 100;
const UpdateUI = function () {
  p1ScoreElement.textContent = p1Score;
  p1CurrentScoreElement.textContent = p1CurrentScore;
  p2ScoreElement.textContent = p2Score;
  p2CurrentScoreElement.textContent = p2CurrentScore;
};
const setPlayerActive = function (player) {
  if (player === 1 && !p1Active) {
    document.querySelector(".player--0").classList.add("player--active");
    document.querySelector(".player--1").classList.remove("player--active");
  } else if (player === 2 && !p2Active) {
    document.querySelector(".player--1").classList.add("player--active");
    document.querySelector(".player--0").classList.remove("player--active");
  }
  p1Active = document.querySelector(".player--0").classList.contains("player--active");
  p2Active = document.querySelector(".player--1").classList.contains("player--active");
};
const handleDice = function () {
  let Number = Math.floor(Math.random() * 6 + 1);
  dice.src = `dice-${Number}.png`;
  dice.style.display = "block";
  return Number;
};
btnRoll.addEventListener("click", function () {
  let diceNumber = handleDice();
  if (p1Active) {
    if (diceNumber === 1) {
      p1CurrentScore = 0;
      UpdateUI();
      setPlayerActive(2);
    } else {
      p1CurrentScore = p1CurrentScore + diceNumber;
      UpdateUI();
    }
  } else if (p2Active) {
    if (diceNumber === 1) {
      p2CurrentScore = 0;
      UpdateUI();
      setPlayerActive(1);
    } else {
      p2CurrentScore = p2CurrentScore + diceNumber;
      UpdateUI();
    }
  }
});
btnHold.addEventListener("click", function () {
  if (p1Active) {
    p1Score += p1CurrentScore;
    p1CurrentScore = 0;
    setPlayerActive(2);
  } else if (p2Active) {
    p2Score += p2CurrentScore;
    p2CurrentScore = 0;
    setPlayerActive(1);
  }
  UpdateUI();
  handleWin();
});
btnNewGame.addEventListener("click", function () {
  setPlayerActive(1);
  p1Score = 0;
  p2Score = 0;
  p1CurrentScore = 0;
  p2CurrentScore = 0;
  btnHold.disabled = false;
  btnRoll.disabled = false;
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector("#name--0").textContent = "Player 1";
  document.querySelector("#name--1").textContent = "Player 2";
  dice.style.display = "none";
  UpdateUI();
});
const handleWin = function () {
  if (p1Score >= winScore) {
    document.querySelector(".player--0").classList.add("player--winner");
    document.querySelector("#name--0").textContent = "Winner!";
    btnHold.disabled = true;
    btnRoll.disabled = true;
  } else if (p2Score >= winScore) {
    document.querySelector(".player--1").classList.add("player--winner");
    document.querySelector("#name--1").textContent = "Winner!";
    btnHold.disabled = true;
    btnRoll.disabled = true;
  }
};
