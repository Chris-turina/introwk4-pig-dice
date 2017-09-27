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
  var die = new Die(6)
  var currentRoll;

  var player = new Player();

  $("button[name=roll-button]").click(function() {
    currentRoll = die.roll();
    if (currentRoll === 1) {
      player.currentScore = 0;
    }
    else {
      player.currentScore += currentRoll;
    }


    $("#round-score").text(player.currentScore);
    $("#current-roll").text(currentRoll);
  });
});
