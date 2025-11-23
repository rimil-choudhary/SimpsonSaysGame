var buttonColors = ["red", "green", "yellow", "purple"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Start the game
document.addEventListener("keydown", function() {
    if (!started) {
        document.querySelector("h1").textContent = "Level " + level;
        nextSequence();
        started = true;
    }
});

// Detect user clicks
document.querySelectorAll(".btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    });
});

// Generate next sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("h1").textContent = "Level " + level;
    document.getElementById("score").textContent = "Score: " + level;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animateSequence(randomChosenColor);
    playSound(randomChosenColor);
}

// Animate sequence
function animateSequence(color) {
    var button = document.getElementById(color);
    button.classList.add("glow");
    setTimeout(function() {
        button.classList.remove("glow");
    }, 400);
}

// Animate user click
function animatePress(color) {
    var button = document.getElementById(color);
    button.classList.add("pressed");
    setTimeout(function() {
        button.classList.remove("pressed");
    }, 200);
}

// Play sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        document.body.classList.add("game-over");
        document.querySelector("h1").textContent = "Game Over! Press Any Key to Restart";
        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 200);

        startOver();
    }
}

// Restart game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    document.getElementById("score").textContent = "Score: 0";
}
