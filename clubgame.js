$(document).ready(function() {

    // declare dem variables!
    let isFirstCharChosen = false;
    let isSecondCharChosen = false;
    let gameReady = false;
    let userJedi = null;
    let computerJedi = null;
    
    
    function resetGame() {
        isFirstCharChosen = false;
        isSecondCharChosen = false;
        gameReady = false;
        userJedi = null;
        computerJedi = null;

        darth.health = 100;
        scoot.health = 100;
        tammy.health = 100;
        rich.health = 100;
    }


    // on clicking reset, reset the game
    $("#reset").on( "click", function() {
        resetGame();
    }); 

    
    $("#fight").on( "click", function() {
        
    });

    $( ".fighter" ).each(function() {
        
    });

});