$(document).ready(function() {


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
        let money = 500;
        let alcohol = 0;



        //populate fields
        $(".money").text(money);

        //show stats in console
        showStats();

        //global timer, do things over time
        setInterval(function () {
            time++;
            score+=1;
            $(".score").text(score);
            // console.log("seconds elapsed:" + time);

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
                2500, 
                "easeInOutElastic", 
                function(){
                    animateDiv(myElement);        
                });
        };

        //people logic
        $('.room .person').each(function(){
            // if they're not already selected
            if (!$(this).hasClass("selected")) {
                animateDiv($(this));

                var xi = $("#seat").offset().left;
                var yi = $("#seat").offset().top;
                console.log(xi);
                console.log(yi);

                $(this).click(function(){
                    $(this).addClass("selected")
                    $(this).animate({
                        top: xi,
                        left: yi     
                    }, 750, function() {
                        $("#seat").append($(this));
                        // $(this).unbind();
                    });
                });
            }
        });


        // buy bottles
        $(".buy-bottle").on( "click", function() {
            if (!bottle) {
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
            console.log("dude clicked");
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