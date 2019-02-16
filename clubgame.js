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
    let alcohol = 0;


    //logic for people

    $('.person').each(function(){
        // if they're not already selected
        if (!$(this).hasClass("selected")) {
            animateDiv($(this));

            var xi = $("#seat").offset().left;
            var yi = $("#seat").offset().bottom;
            console.log(xi);
            console.log(yi);

            $(this).click(function(){
                $(this).addClass("selected")
                $(this).animate({
                    top: xi,
                    left: yi     
                }, 750, function() {
                    $("#seat").append($(this));
                });
            });
        }
    });

    // people animation logic
    function makeNewPosition(){
        var h = $($(".room")).height() - 50;
        var w = $($(".room")).width() - 50;
        
        var nh = Math.floor(Math.random() * h);
        var nw = Math.floor(Math.random() * w);
        
        return [nh,nw];    
    }
    function animateDiv(myElement){
        var newq = makeNewPosition();
        myElement.animate({ top: newq[0], left: newq[1] }, 
            2500, 
            "easeInOutElastic", 
            function(){
                animateDiv(myElement);        
            });
    };

    //populate fields
    $(".money").text(money);

    //show stats in console
    showStats();

    //global timer
    // setInterval(function () {
    //     console.log("timer")
    // }, 1000); 
    
    
    function showStats() {
        console.log("bottles: " + numBottles);
        console.log("numGirls:" + numGirls);
        console.log("numGuys:" + numGuys);
        console.log("score:" + score);
        console.log("money:" + money);
        console.log("alcohol level:" + alcohol);
    };

    function resetGame() {

    };


    // buy bottles
    $(".buy-bottle").on( "click", function() {
        if (!numBottles) {
            $(".bottle").fadeIn();
            numBottles++;

            money-=500;
            alcohol+=100;
            $(".money").text(money);
        }
        showStats();
    });

    // $( ".fighter" ).each(function() {
        
    // });

});