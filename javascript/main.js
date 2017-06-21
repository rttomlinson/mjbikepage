$( document ).ready(function() {
    console.log( "ready!" );
    
    
    let currentSlidePosition = 0;
    //attached event listener to slider-next button
    $('.slider-next').click(function() {
        ++currentSlidePosition;
        //grab the .slider, pull the data value off of the item, multiply the translation
        let $slides = $('.slides');
        $slides.css({transform: `translateX(${currentSlidePosition * -50}%)`});
    });
    $('.slider-prev').click(function() {
        --currentSlidePosition;
        //grab the .slider, pull the data value off of the item, multiply the translation
        let $slides = $('.slides');
        $slides.css({transform: `translateX(${currentSlidePosition * -50}%)`});
    });
    
    
    function updatePresentationalSlide() {
        
    }
    
    
});