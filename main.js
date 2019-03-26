// smooth scrolling for in-text links
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

// video play on hover
$( document ).ready(function() {
    $(".web-img video").fadeIn(1000);
    $(".web-img").hover(function () {
        $(this).children("video")[0].play();
    }, function () {
        var el = $(this).children("video")[0];
        el.pause();
    });
});



// create slider
// var priceRange = document.getElementById('range');

// noUiSlider.create(priceRange, {
//     start: [ 10 ],
//     step: 10,
//     range: {
//         'min': 0,
//         'max': 20
//     }
// });

// // When the slider value changes, update the span and div
// priceRange.noUiSlider.on('update', function( values, handle ) {
//     if (values[handle] == 0.00) {
//         jQuery("body").addClass("no-ui");
//         jQuery("body").removeClass("extra-ui");
//     } else if (values[handle] == 10.00) {
//         jQuery("body").removeClass("no-ui");
//     } else if (values[handle] == 20.00) {
//         jQuery("body").addClass("extra-ui");
//         jQuery("body").removeClass("no-ui");
//     }
// });

// on topper image click, scroll down to slider, move slider and sections appropriately (using callback function)
// jQuery( ".real-topper > a" ).click(function() {
//     var data = parseInt(jQuery(this).attr( "data-attribute" ));
//     jQuery('html, body').animate({
//         scrollTop: jQuery(".slide-control").offset().top
//     }, 400, function(){
//         priceRange.noUiSlider.set(data);
//     });
// });

// When the input changes, set the slider value
// var valueInput = document.getElementById('value-input');


// valueInput.addEventListener('change', function(){
//     range.noUiSlider.set([null, this.value]);
// });