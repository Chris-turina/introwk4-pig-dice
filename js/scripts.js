// Game constructor and methods
function Game(numberOfPlayers) {
  this.die = new Die(6);

  this.players = [];
  for (var i = 0; i < numberOfPlayers; i++) {
    this.players.push(new Player(i));
  }

  this.numberOfPlayers = numberOfPlayers;
  this.currentPlayerIndex = 0;
  this.currentPlayer = this.players[this.currentPlayerIndex];
}

Game.prototype.currentPlayerRoll = function() {
  var currentRoll = this.die.roll();
  if (currentRoll === 1) {
    this.currentPlayer.currentScore = 0;
    this.nextTurn();
  }
  else {
    this.currentPlayer.currentScore += currentRoll;
  }
  return currentRoll;
}

Game.prototype.currentPlayerHold = function() {
  this.currentPlayer.totalScore += this.currentPlayer.currentScore;
  this.nextTurn();
}

Game.prototype.nextTurn = function() {
  this.currentPlayer.currentScore = 0;
  this.currentPlayerIndex += 1;
  this.currentPlayerIndex %= this.numberOfPlayers;
  this.currentPlayer = this.players[this.currentPlayerIndex];
}

// Player constructor and methods
function Player(id, name) {
  this.id = id;
  this.name = name;
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


function updatePlayerScore(player) {
  $("#player-" + player.id + "-score").text(player.totalScore);
}

function displayPlayerNames(player) {
  $("#player-" + player.id + "-name").text(player.id);
}


// UI logic
$(document).ready(function() {
  var game = new Game(2);
  game.players.forEach(function(player) {
    displayPlayerNames(player);
  });

  $("button[name=roll-button]").click(function() {
    var rollingPlayer = game.currentPlayer
    var currentRoll = game.currentPlayerRoll();

    $("#round-score").text(rollingPlayer.currentScore);
    $("#current-roll").text(currentRoll);
    updatePlayerScore(rollingPlayer);
    $("#current-player").text(game.currentPlayer.id);
  });

  $("button[name=hold-button]").click(function() {
    var rollingPlayer = game.currentPlayer
    game.currentPlayerHold();

    $("#round-score").text("");
    $("#current-roll").text("");
    updatePlayerScore(rollingPlayer);
    $("#current-player").text(game.currentPlayer.id);
  });
});
