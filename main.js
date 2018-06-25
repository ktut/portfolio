// smooth scrolling for in-text links
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});


// create slider
// var priceRange = document.getElementById('range');

// noUiSlider.create(priceRange, {
//     start: [ 20 ],
//     step: 20,
//     range: {
//         'min': 20,
//         'max': 120
//     }
// });

// When the slider value changes, update the span and div
// priceRange.noUiSlider.on('update', function( values, handle ) {

//     jQuery("div.section").hide();

//     if (values[handle] == 20.00) {
//         jQuery(".twofifty").fadeIn();
//     } else if (values[handle] == 40.00) {
//         jQuery(".fourhundred").fadeIn();
//     } else if (values[handle] == 60.00) {
//         jQuery(".sixhundred").fadeIn();
//     } else if (values[handle] == 80.00) {
//         jQuery(".eighthundred").fadeIn();
//     } else if (values[handle] == 100.00) {
//         jQuery(".onemil").fadeIn();
//     } else if (values[handle] == 120.00) {
//         jQuery(".skylimit").fadeIn();
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