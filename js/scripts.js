// Game constructor and methods
function Game(players) {
  this.players = players;
  this.numberOfPlayers = players.length;
  this.currentPlayerIndex = 0;
  this.currentPlayer = this.players[this.currentPlayerIndex];

  this.die = new Die(6);
  this.winningScore = 100;
  this.winningPlayer = null;
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
  if (this.currentPlayer.totalScore >= this.winningScore) {
    this.winningPlayer = this.currentPlayer;
  }
  else {
    this.nextTurn();
  }
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


// UI logic
function updatePlayerScore(player) {
  $("#player-" + player.id + "-score").text(player.totalScore);
}

function displayPlayerNames(players) {
  players.forEach(function(player) {
    $("#player-" + player.id + "-name").text(player.name);
  });
}

function initializeScores() {
  $("#player-1-score").text(0);
  $("#player-2-score").text(0);
}

function resetCurrentRound() {
  $("#round-score").text(0);
  $("#current-roll").text("-");
}

function displayGame() {
  initializeScores();
  resetCurrentRound();
  $("#game").slideDown();
  $("#intro").slideUp();
}

$(document).ready(function() {
  $("button[name=start-button]").click(function() {
    var players = [];
    var player1Name = $("#player-1-name-input").val();
    var player2Name = $("#player-2-name-input").val();

    if (player1Name === "" || player2Name === "") {
      $("#invalid-name-modal").modal("show");
    }
    else {
      displayGame();
      players.push(new Player(1, player1Name));
      players.push(new Player(2, player2Name));
      var game = new Game(players);
      displayPlayerNames(players);
      $("#current-player").text(game.currentPlayer.name);

      // Roll function
      $("button[name=roll-button]").click(function() {
        var rollingPlayer = game.currentPlayer
        var currentRoll = game.currentPlayerRoll();
        if (currentRoll === 1) {
          $("#rolled-one-modal").modal("show");
          resetCurrentRound();
          $("#current-player").text(game.currentPlayer.name);
        }
        else {
          $("#round-score").text(rollingPlayer.currentScore);
          $("#current-roll").text(currentRoll);
        }
      });

      // Hold function
      $("button[name=hold-button]").click(function() {
        var rollingPlayer = game.currentPlayer;
        game.currentPlayerHold();
        if (game.winningPlayer !== null) {
          $("#winning-player").text(game.winningPlayer.name);
          $("#winning-score").text(game.winningPlayer.totalScore);
          $("#game").slideUp();
          $("#win").slideDown();
        }
        else {
          resetCurrentRound();
          updatePlayerScore(rollingPlayer);
          $("#current-player").text(game.currentPlayer.name);
        }
      });
      $("button[name=restart-button]").click(function() {
        location.reload(true);
      });
    }
  });
});
