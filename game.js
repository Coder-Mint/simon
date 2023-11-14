var btnColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var usrClickPattern = [];
var gameOn = false;
var level = 0;

$("div.btn").click(function () {
    usrChosenColor = $(this).attr("id");
    usrClickPattern.push(usrChosenColor);
    playSound(usrChosenColor);
    animPress(usrChosenColor);
    checkAns(usrClickPattern.length-1);
})

function nextSequence() {
    usrClickPattern = [];
    level++;
    $('h1').text('Level ' + level);
    randNum =  Math.floor(Math.random() * 4);
    randChosenColor = btnColors[randNum];
    gamePattern.push(randChosenColor);
    $("#" + randChosenColor).fadeOut(100).fadeIn(100);
    playSound(randChosenColor);
}

function playSound(name) {
    audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animPress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass("pressed");
    }, 100);
}

function checkAns(currentLvl) {
    if (usrClickPattern[currentLvl] === gamePattern[currentLvl]) {
        if (usrClickPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $('h1').text('Game Over, Press Any Key to Restart');
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function startOver() {
    gameOn = false;
    level = 0;
    gamePattern = [];
}

$('body').keydown(function () {
    if (gameOn === false) {
        gameOn = true;
        $('h1').text('Level 0');
        nextSequence(); 
    }
})
