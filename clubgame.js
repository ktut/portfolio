$(document).ready(function() {

    $(document).bind("dragstart", function(event, ui){
    event.preventDefault(); 
    //return false;//edited
    });

    $(".start-game").on( "click", function() {
        $("#title").removeClass("active");
        $("#club").addClass("active");
        $("#info").addClass("active");

        //start game
        playGame();

    });

    function playGame() {
       
        setTimeout(function(){
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 0);

        // declare initial global variables
        let time = 0;
        let bottle = false;
        let numGirls = 0;
        let numGuys = 0;
        let score = 0;
        let money = 1200;
        let alcohol = 0;

        //populate fields
        $(".money").text(money);
        $(".score").text(score);

        //show stats in console
        showStats();

        // things to do per second
        setInterval(function () {
            time++;
            
            // at table, girls = two points, guys = negative one point
            score += 2 * $("#seat").children(".girl").length;
            score -= $("#seat").children(".guy").length;

            $(".score").text(score);

            // sometimes, if low alcohol, and people at table, they leave
            if (Math.random() < .2 && alcohol < 30 && $("#seat").children().length) {
                var xe = -1 * $("#seat").offset().left;
                var ye = -1 * $("#seat").offset().top;

                let booted = $("#seat .person:last-child");

                booted.animate({
                    top: ye,
                    left: xe     
                }, 550, function() {
                    $(".room").append(booted);
                });
            }

            // girls flock to bottle
            if (Math.random() < .4 && bottle) {
                
                var xi = $("#seat").offset().left;
                var yi = $("#seat").offset().top;

                let bottleRat = $(".room .person.girl:first-child");

                bottleRat.addClass("selected")
                bottleRat.animate({
                    top: yi,
                    left: xi     
                }, 750, function() {
                    $("#seat").append(bottleRat);
                });
            }

            //reduce alcohol every second, if people at table
            if (bottle && alcohol > 0 && $("#seat").children().length) {
                alcohol = alcohol - $("#seat").children().length;
            } else if (bottle && alcohol < 1) {
                bottle = false;
                alcohol = 0;
                $(".bottle").fadeOut();
            }



            //spawn person
            // $('.room').append($('<div class="person">'));
        }, 1000); 
        
        
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
                2000, 
                "easeInOutElastic", 
                function(){
                    animateDiv(myElement);        
                });
        };

        

        //make people draggable

        $( ".person" ).draggable();
        $( "#seat" ).droppable({
            drop: function( event, ui ) {
            $( this )
                .addClass( "selected" );
                $("#seat").append(ui);
            }
        });

        // $('.room .person').each(function(){
        //     // if they're not already selected
        //     if (!$(this).hasClass("selected")) {
        //         // animateDiv($(this));

        //         // var xi = $("#seat").offset().left;
        //         // var yi = $("#seat").offset().top;

        //         // $(this).click(function(){
        //         //     $(this).addClass("selected")
        //         //     $(this).animate({
        //         //         top: yi,
        //         //         left: xi     
        //         //     }, 750, function() {
        //         //         $("#seat").append($(this));
        //         //         // $(this).unbind();
        //         //     });
        //         // });

        //         $(this).draggable();
        //     }
        // });


        // buy bottles
        $(".buy-bottle").on( "click", function() {
            if (!bottle && money >= 500) {
                $(".bottle").fadeIn();
                bottle = true;

                money-=500;
                alcohol+=100;
                $(".money").text(money);
            }
            showStats();
        });

        // extract money from dudes
        $(document).on("click","#seat .person.guy",function() {
            if (Math.random() < .2) {
                console.log("money");
                money += 40;

                $(".money").text(money);
            } else {
                console.log("no money");
            }
        });

        function showStats() {
            console.log("bottleExists: " + bottle);
            console.log("numGirls:" + numGirls);
            console.log("numGuys:" + numGuys);
            console.log("score:" + score);
            console.log("money:" + money);
            console.log("alcohol level:" + alcohol);
        };

        // function resetGame() {

        // };
        
    }


});