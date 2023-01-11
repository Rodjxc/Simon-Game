//========================================

//SECTION 1: We define the arrays we're going to use and callback functions

//=======================================

buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function playWrongSound(){
  var audio = new Audio("sounds/wrong.mp3");
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

//============= Starting the game ===============

//The game gets started when pressing a random key. 

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//========================================

//SECTION 2: We determine the random pattern, and the user clicks. 

//=======================================

function nextSequence() {
  // Setting the length to 0 we make sure it starts clean every time we restart the game

  userClickedPattern = [];

    //then, we increase the level, and change the text of the level using jQuery

  level++;
  $("#level-title").text("Level " + level);

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

  //and we're going to give it a little flash when that class gets chosen and to play a sound. We use callback functions
  //for that
  
  animatePress(randomChosenColour);

  // now, we'll call the playSound function to play an audio based on that randomChosenColour depending on the colour chosen.
   //That will replace the variable "name" on the playSound function

  playSound(randomChosenColour);
   
}

//  ===   USER BUTTON SELECTION    ====

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  });


//========================================

//SECTION 3 - The game

//=======================================


function checkAnswer(currentLevel) {

  // Then we write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern.
  // If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playWrongSound();
    level = 0;
    started = false;
    $("body").addClass('game-over');  
    setTimeout(function() {
        $("body").removeClass('game-over');
    }, 200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver (){
  level = 0;
  gamePattern = [];
  started = false;
}