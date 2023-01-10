//========================================

//SECTION 1: We define the arrays we're going to use and callback functions

//=======================================

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// we created a "task"/function that will play a sound based on a parameter called name. This will be a callback function
//that we'll call later on when we need to play Audios

function animatePress(currentColor) {
  //We add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //And we remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Now, we create the pressed effect. Also a callback function that will be called later on.

//========================================

//SECTION 2: We determine the random pattern, and the user clicks

//=======================================

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 3) + 1;

  //This will generate a random number between 1 and 4 and save it as randomNumber

  var randomChosenColour = buttonColours[randomNumber];

  //Now, that random number, will transform into a random "colour" from inside the array called buttonColours, and the selected
  //colour, will be saved as randomChosenColour

  gamePattern.push(randomChosenColour);

  //that randomChosenColour, it's going to be pushed into the gamePattern array

  $("." + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  //and we're going to give it a little flash when that class gets chosen.

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

// now, we'll call the playSound function to play an audio based on that randomChosenColour depending on the colour chosen. That will replace
//the variable "name" on the playSound function

//  ===   USER BUTTON SELECTION    ====

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenColour);
});

//========================================

//SECTION 3 - The game

//=======================================

// $(document).keypress(nextSequence);

var gameStarted = false;

$(document).keypress(function (event) {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level 0");
    nextSequence();
  }
});

var level = 0;

function checkAnswer(currentLevel){
  if (userChosenColour === gamePattern){
    console.log("success");
  }
  else {console.log("wrong");}
}