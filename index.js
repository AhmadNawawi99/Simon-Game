const buttonColors = ["red" , "blue", "yellow", "green"];
let pattern = [];
let randomColor = "";
let randomNumber;
let userClickedPattern = [];
let level = 1;
let started = false;


function nextStep(){
        
        userClickedPattern = [];
    
        randomNumber = Math.floor(Math.random() * 4); 
        randomColor = buttonColors[randomNumber];
        pattern.push(randomColor);

        $("#level-title").text("Level " + level);
        // const sound = new Audio("/sounds/" + randomColor + ".mp3");  
        level++;
        $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
        newSound(randomColor);     
};

function newSound(color){
    const sound = new Audio("/sounds/" + color + ".mp3");
    sound.play();

}

$(document).on("keypress", function(){
    if (!started) {
        nextStep();
        started = true
      }
});

$(".btn").on("click", function(){
    let userChooseColor = $(this).attr("id");
    userClickedPattern.push(userChooseColor);

    newSound(userChooseColor);
    pressAnimation(userChooseColor);
    checkAnswer(userClickedPattern.length-1);
   
});


function pressAnimation(colorChosen){
    $("#"+ colorChosen).addClass("pressed");

    setTimeout(function(){
        $("#"+ colorChosen).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){ 
    if (userClickedPattern[currentLevel] === pattern[currentLevel]) {
        if(pattern.length === userClickedPattern.length){
            setTimeout(nextStep, 1000);
        }  
    }
    else{
        $("body").addClass("game-over");
        $("#level-title").text(`Game Over, Press any key to restart, your score is ${level-1}`);
        
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        
        const audio = new Audio("/sounds/wrong.mp3");
        audio.play();
        startOver();
    } 
}

function startOver(){
    level = 1;
    pattern = [];
    started = false;
}









