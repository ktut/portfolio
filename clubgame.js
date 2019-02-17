window.addEventListener( 'touchmove', function() {})

$(document).ready(function() {

    let character = "";

    $(".char-select > div").on( "click", function() {
        $(this).siblings("div").fadeOut();
        $(".start-game").fadeIn();
        $(".char-select > h2").hide();
        if ( $( this ).hasClass( "adam" ) ) {
            character = "adam";
        } else {
            character = "ryan";
        }
    });

    $(".start-game").on( "click", function() {
        $("#title").removeClass("active");
        $("#club").addClass("active");
        $("#info").addClass("active");
        $(".char-select").fadeOut();

        //start game
        playGame();
    });

    function playGame() {
       
        // this may or may not work
        setTimeout(function(){
            // Hide the address bar!
            window.scrollTo(0, 1);
        }, 200);

        // declare initial global variables
        let time = 0;
        let speechBubbleText = "";
        let bottle = false;
        let numGirls = 0;
        let numGuys = 0;
        let score = 0;
        let money = 1200;
        let alcohol = 0;
        let roomWidth = parseFloat($(".room").width());
        let roomHeight = parseFloat($(".room").height());
        
        
        // character-specific things
        if (character === "adam") {
            $(".character .adam").show();
            $('#seat')
            .append($('<div class="person girl">'))
            .append($('<div class="person girl">'))
            .append($('<div class="person girl">'));
        } else {
            $(".character .ryan").show();
            money += 1000;
        }

        //populate fields
        $(".money").text(money);
        $(".score").text(score);

        // place people randomly in room
        $('.room .person').each(function(){
            let newx = roomWidth * Math.random();
            let newy = roomHeight * Math.random();

            $(this)
            .css({
                top: newy, 
                left: newx
            })
            .css("z-index", parseInt(newy / 15) + 1)
            .css("animation-delay", Math.random() + "s");
        });

        //show stats in console
        showStats();

        // things to do per half second
        setInterval(function () {
            time++;

            // set speech text

            // event-based speech
            // let guysNotAppeared = true;
            // if ($("#seat").children(".guy").length && guysNotAppeared) {
            //     speechBubbleText = "fuck, no dudes";
            //     guysNotAppeared = false;
            // }

            // timer-based speech
            if (time === 1) {
                speechBubbleText = "get girls to get points";
            } else if (time === 10) {
                speechBubbleText = "drag them to the table";
            } else if (time === 20) {
                speechBubbleText = "try to get the highest score before the club closes";
            } else if (time === 50) {
                speechBubbleText = "no dudes";
            } else if (time === 2000 && !bottle && money >= 500) {
                speechBubbleText = "buy a bottle";
            }

            // if (character === "ryan") {
            //     speechBubbleText = "yo, " + speechBubbleText;
            // }

            // show speech text
            $(".speech-bubble").text(speechBubbleText);


            //update money purchasing power
            if (money < 500) {
                $('.buy-bottle').prop("disabled",true);
            }
            
            let pointsString = "";
            // numGirls = $("#seat").children(".girl").length;
            // numGuys = $("#seat").children(".guy").length;
            
            // at table, girls = two points, guys = negative one point
            score += 2 * numGirls;
            score -= numGuys;

            // add these in points string
            // pointsString += "+2 ".repeat(numGirls);
            // pointsString += "-1 ".repeat(numGuys);

            $('#seat .person').each(function(){
                if ($(this).hasClass("girl")) {
                    pointsString += "+2 "
                } else if ($(this).hasClass("guy")) {
                    pointsString += "-1 "
                }
            });

            // show pointsstring, show score
            $("#points").text(pointsString);
            $(".score").text(score);

            // if low alcohol, people at table, and after a few seconds of game, people leave table
            if (Math.random() < .15 && alcohol < 30 && $("#seat").children().length) {

                let booted = $("#seat .person:last-child");
                let xe = booted.offset.left;
                let ye = booted.offset.top;
                let newx = roomWidth * Math.random();
                let newy = roomHeight * Math.random();

                booted
                .removeClass("selected")
                .addClass("pissed")
                .delay(1000)
                .removeClass("pissed");

                booted.animate({
                    top: ye,
                    left: xe     
                }, 550, function() {
                    $(".room").append(booted);
                    booted.css({
                        top: newy, 
                        left: newx
                    })
                    .css("z-index", parseInt(newy / 15) + 1)
                    .css("animation-delay", Math.random() + "s");
                });
            }

            // girls flock to bottle
            if (Math.random() < .2 && bottle && $("#seat").children().length <= 10) {
                
                var xi = $("#seat").offset().left;
                var yi = $("#seat").offset().top;

                let bottleRat = $(".room .person.girl:first-child");

                bottleRat.addClass("selected")
                .css("z-index", "1");
                bottleRat.animate({
                    top: yi,
                    left: xi     
                }, 1000, function() {
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
            
        }, 500); 
        
        
        // people random movement logic
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
        $( ".person" ).draggable({
            cursor: 'move',
            stack: "div",
            distance: 0
        });

        // make seat droppable
        $( ".table" ).droppable({
            drop: function( event, ui ) {
            $( this )
                $("#seat").append($(ui.draggable))
                $(ui.draggable)
                .addClass("selected")
                .css("z-index", "1");
            }
        });

        // make room also droppable
        $( ".room" ).droppable({
            drop: function( event, ui ) {
            $( this )
                $(this).append($(ui.draggable))
                $(ui.draggable).removeClass("selected");
            }
        });


        // buy bottles
        $(".buy-bottle").on( "click", function() {
            if (!bottle && money >= 500) {
                $(".bottle").fadeIn(1000);
                $(".speech-bubble").text("nice, girls will come now");
                setTimeout(function(){ 
                    bottle = true 
                }, 2000);

                money-=500;
                alcohol+=100;
                $(".money").text(money);
            }
            showStats();
        });

        // extract money from dudes
        $("#seat .person.guy").on("click", function() {
            if (Math.random() < .2) {
                console.log("money");
                money += 40;

                $(".money").text(money);
            } else {
                $(this).addClass("pissed").delay(1000).removeClass("pissed");
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