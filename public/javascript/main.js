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


    let slides = ["assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png", "assets/smith-helmet-show.png"];
    let lastSlide = slides.length - 1;

    let currentSlidePosition = 0;
    //should pull this from the initial load
    let currentSliderOffset = -25;
    //attached event listener to slider-next button

    /*********************
     * Attach slider listeners
     *********************/

    $('.slider-next').click(function() {
        if (currentSlidePosition === lastSlide) {
            return;
        }
        ++currentSlidePosition;
        currentSliderOffset -= 50;
        let $slides = $('.slides');
        let $presentationalSlide = $('.presentational-slide');
        //reduce the side of the presentationalSlide
        togglePresentationalSlide();
        $presentationalSlide.one(transEndEventName,
            function(e) {
                console.log("firing transform of presentational slide done", e);

                //change url reference of the presentationSlide, pull off corresponding active-slide
                $($presentationalSlide.children("img")[0]).attr("src", slides[currentSlidePosition]);

                setTranslateX($slides, currentSliderOffset);
            });
        $slides.one(transEndEventName,
            function(e) {
                console.log("transform of slides translate done", e);
                //fade new presentational slide in
                togglePresentationalSlide();

            });
    });

    $('.slider-prev').click(function() {
        --currentSlidePosition;
        currentSliderOffset += 50;
        //grab the .slider, pull the data value off of the item, multiply the translation
        let $slides = $('.slides');
        let $presentationalSlide = $('.presentational-slide');
        //reduce the side of the presentationalSlide
        togglePresentationalSlide();
        $presentationalSlide.one(transEndEventName,
            function(e) {
                console.log("firing transform of presentational slide done", e);
                //change url reference of the presentationSlide, pull off corresponding active-slide
                $($presentationalSlide.children("img")[0]).attr("src", slides[currentSlidePosition]);
                setTranslateX($slides, currentSliderOffset);
            });
        $slides.one(transEndEventName,
            function(e) {
                console.log("transform of slides translate done", e);
                //fade new presentational slide in
                togglePresentationalSlide();

            });
    });


    $(".plus-slider-button").click(function(e) {
        console.log("moving to specific slide!", this.getAttribute('data-slideNum'));
        let nextSlidePosition = this.getAttribute('data-slideNum');
        if (nextSlidePosition === currentSlidePosition) {
            return;
        }
        currentSlidePosition = nextSlidePosition;
        currentSliderOffset = -25 + (currentSlidePosition * -50);
        //grab the .slider, pull the data value off of the item, multiply the translation
        let $slides = $('.slides');
        let $presentationalSlide = $('.presentational-slide');
        //reduce the side of the presentationalSlide
        togglePresentationalSlide();
        $presentationalSlide.one(transEndEventName,
            function(e) {
                console.log("firing transform of presentational slide done", e);
                //change url reference of the presentationSlide, pull off corresponding active-slide
                $($presentationalSlide.children("img")[0]).attr("src", slides[currentSlidePosition]);
                setTranslateX($slides, currentSliderOffset);
            });
        $slides.one(transEndEventName,
            function(e) {
                console.log("transform of slides translate done", e);
                //fade new presentational slide in
                togglePresentationalSlide();

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

    function togglePresentationalSlide() {
        //fade out the current slide and reduce scale
        return new Promise((resolve, reject) => {
            $(".presentational-slide").toggleClass('active-presentational-slide');
        });
    }
});
