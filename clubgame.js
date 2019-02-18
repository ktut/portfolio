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
        $(".char-select").slideUp();
        $(".start-game").slideUp();

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
        let hourTime = "10:00 PM";
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

            // on time change, pulse time visually
            if (time % 25 === 0) {
                $("#time").addClass("pulse").delay(1000).queue(function(){
                    $("#time").removeClass("pulse").dequeue();
                });          
            }

            // change clock
            if (time === 50) {
                hourTime = "11:00 PM";
            } else if (time === 75) {
                hourTime = "11:30 PM";
            } else if (time === 100) {
                hourTime = "12:00 AM";
            } else if (time === 125) {
                hourTime = "12:30 AM";
            } else if (time === 150) {
                hourTime = "1:00 AM";
            } else if (time === 175) {
                hourTime = "1:30 AM";
            } else if (time === 200) {
                hourTime = "2:00 AM";
                $("#time").css("color", "red");
            }

            if (time > 220) {
                console.log("game over");
            } else {
                $("#time").text(hourTime);
            }


            // set speech text

            // event-based speech
            // let guysNotAppeared = true;
            // if ($("#seat").children(".guy").length && guysNotAppeared) {
            //     speechBubbleText = "fuck, no dudes";
            //     guysNotAppeared = false;
            // }

            // timer-based speech
            if (time === 1) {
                speechBubbleText = "drag girls to the table for points";
            } else if (time === 15 && $("#seat").children(".guy").length) {
                speechBubbleText = "dudes make you lose points. no dudes";
            } else if (time === 30) {
                speechBubbleText = "get your score up before the club closes at 2AM";
            } else if (time === 100) {
                speechBubbleText = "or just chill, yo";
            } else if (time === 100 && !bottle && money >= 500) {
                speechBubbleText = "buy a bottle. hos may flock";
            } else if (time === 110) {
                speechBubbleText = "you guyyyys";
            } else if (time === 140) {
                speechBubbleText = "pew pew pew";
            } else if (time === 150) {
                speechBubbleText = "i'm tired but we gotta go harder somehow";
            } else if (time === 170) {
                speechBubbleText = "where the hos at";
            } else if (time === 170) {
                speechBubbleText = "i guess... they're here";
            } else if (time === 210) {
                speechBubbleText = "gettin sleepy, y'all";
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
            numGirls = $("#seat").children(".girl").length;
            numGuys = $("#seat").children(".guy").length;
            
            // at table, girls = two points, guys = negative one point
            score += 2 * numGirls;
            score -= numGuys;

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


                $("#champagne").css("transform", "rotate(-10deg) translateY(" + (100 - parseInt(alcohol)) + "px)");
            } else if (bottle && alcohol < 1) {
                bottle = false;
                alcohol = 0;
                $(".bottle").fadeOut(1000);
            }

            // end game
            if (time === 220) {
                $("#title").removeClass("active");
                $("#club").removeClass("active");
                $("#info").removeClass("active");
                $("#end").addClass("active");
                $(".endscore").text(score);
                if (score < 500) {
                    $(".endcomments").text("next time, stay home");
                } else if (score < 1500) {
                    $(".endcomments").text("weird flex but ok");
                } else if (score < 2000) {
                    $(".endcomments").text("...niiiice");
                } else if (score >= 2000) {
                    $(".endcomments").text("GOD OF THE NIGHT, THE SWEDES ARE HEREBY YOURS");
                }

                //start game
                playGame();
            }
            
        }, 500); 
        
        // end time-based stuff
        
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
                bottle = true 

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


        $("#end .play-again").on("click", function() {
            window.location.reload();
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