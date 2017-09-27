// Game constructor and methods
function Game(players) {
  this.players = players;
  this.numberOfPlayers = players.length;
  this.currentPlayerIndex = 0;
  this.currentPlayer = this.players[this.currentPlayerIndex];

  this.die = new Die(6);
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
  console.log(player.id);
  $("#player-" + player.id + "-name").text(player.name);
}


// UI logic
$(document).ready(function() {
  var players = [];
  $("button[name=start-button]").click(function() {
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();
    players.push(new Player(1, player1Name));
    players.push(new Player(2, player2Name));

    var game = new Game(players);
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
});
