function whichTransitionEvent() {
    let el = document.createElement('fake'),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd', // Saf 6, Android Browser
            'MozTransition': 'transitionend', // only for FF < 15
            'transition': 'transitionend' // IE10, Opera, Chrome, FF 15+, Saf 7+
        };

    for (let t in transEndEventNames) {
        if (el.style[t] !== undefined) {
            return transEndEventNames[t];
        }
    }
}

const transEndEventName = whichTransitionEvent();

$(document).ready(function() {
    console.log("ready!");
    
    /***********************
     * Set initial state of slider
     ***********************/
    
    
    //Testing only. Remove for production
    let imageUrls = ["assets/smith-helmet-1500x1000.png", "assets/gopro-camera.jpg", "assets/lezyne-tool.jpg"];
    //End testing only
    
    
    
    
    let currentSlidePosition = 0;
    //should pull this from the initial load
    let currentSliderOffset = -25;
    //attached event listener to slider-next button
    
    /*********************
     * Attach lister listeners
     *********************/
    
    $('.slider-next').click(function() {
        ++currentSlidePosition;
        currentSliderOffset -= 50;
        let $slides = $('.slides');
        let $presentationalSlide = $('.presentational-slide');
        //reduce the side of the presentationalSlide
        fadeOutPresentationalSlide();
        $presentationalSlide.one(transEndEventName,
            function(e) {
                console.log("firing transform of presentational slide done", e);
                
                //change url reference of the presentationSlide, pull off corresponding active-slide
                $($presentationalSlide.children("img")[0]).attr("src", imageUrls[currentSlidePosition]);
                
                setTranslateX($slides, currentSliderOffset);
            });
        $slides.one(transEndEventName,
            function(e) {
                console.log("transform of slides translate done", e);
                //fade new presentational slide in
                fadeInPresentationalSlide();

            });
    });
    
    $('.slider-prev').click(function() {
        --currentSlidePosition;
        currentSliderOffset += 50;
        //grab the .slider, pull the data value off of the item, multiply the translation
        let $slides = $('.slides');
        let $presentationalSlide = $('.presentational-slide');
        //reduce the side of the presentationalSlide
        fadeOutPresentationalSlide();
        $presentationalSlide.one(transEndEventName,
            function(e) {
                console.log("firing transform of presentational slide done", e);
                setTranslateX($slides, currentSliderOffset);
            });
        $slides.one(transEndEventName,
            function(e) {
                console.log("transform of slides translate done", e);
                //fade new presentational slide in
                fadeInPresentationalSlide();

            });
    });
    
    /**********************
     * Helpers
     **********************/
    function setTranslateX(element, position) {
        $(element).css({
            transform: `translateX(${position}%)`
        });
    }
    function fadeOutPresentationalSlide() {
        //fade out the current slide and reduce scale
        return new Promise((resolve, reject) => {
            $(".presentational-slide").css({
                transform: "scale(1.0)",
                opacity: 0
            });
        });
    }
    function fadeInPresentationalSlide() {
        //fade in the current slide and increase scale
        $(".presentational-slide").css({
            transform: "scale(1.025)",
            opacity: 1.0
        });
    }
});



