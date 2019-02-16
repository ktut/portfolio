$(document).ready(function() {

    setTimeout(function(){
		// Hide the address bar!
		window.scrollTo(0, 1);
	}, 0);

    // declare initial global variables
    let numBottles = 0;
    let numGirls = 0;
    let numGuys = 0;
    let score = 0;
    let money = 500;

    //show stats in console
    showStats();

    //global timer
    // setInterval(function () {
    //     somethingElse();
    // }, 2000); // Execute somethingElse() every 2 seconds.
    
    
    function showStats() {
        console.log("bottles: " + numBottles);
        console.log("numGirls:" + numGirls);
        console.log("numGuys:" + numGuys);
        console.log("score:" + score);
        console.log("money:" + money);
    };

    function resetGame() {

    };


    // buy bottles
    $(".buy-bottle").on( "click", function() {
        if (!numBottles) {
            $(".bottle").fadeIn();
            numBottles++;
            money-=500;
        }
        showStats();
    });

    // $( ".fighter" ).each(function() {
        
    // });

});