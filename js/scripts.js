// Game constructor and methods
function Game(numberOfPlayers) {
  this.die = new Die(6);

  this.players = [];
  for (var i = 0; i < numberOfPlayers; i++) {
    this.players.push(new Player);
  }

  this.currentPlayer = this.players[0];
}

Game.prototype.currentPlayerRoll = function() {
  var currentRoll = this.die.roll();
  if (currentRoll === 1) {
    this.currentPlayer.currentScore = 0;
  }
  else {
    this.currentPlayer.currentScore += currentRoll;
  }
  return currentRoll;
}

Game.prototype.currentPlayerHold = function() {

}

// Player constructor and methods
function Player() {
  this.totalScore = 0;
  this.currentScore = 0;
}

// Dice constructor and methods
function Die(numberOfSides) {
  this.numberOfSides = numberOfSides;
}

Die.prototype.roll = function() {
  return Math.floor(Math.random() * this.numberOfSides + 1);
}

// UI logic
$(document).ready(function() {
  var game = new Game(1);

  $("button[name=roll-button]").click(function() {
    var currentRoll = game.currentPlayerRoll();

    $("#round-score").text(game.currentPlayer.currentScore);
    $("#current-roll").text(currentRoll);
  });
});
