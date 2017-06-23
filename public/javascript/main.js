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
    let transitionActive = false;
    let $slides = $('.slides');
    let $presentationalSlide = $('.presentational-slide');

    /*********************
     * Attach slider listeners
     *********************/

    $('.slider-next').click(function() {
        if (currentSlidePosition === lastSlide || transitionActive) {
            return;
        }
        transitionActive = true;
        ++currentSlidePosition;
        currentSliderOffset -= 50;

        addListenerForPresentationSlideFade()
            .then(() => {
                changePresentationalSlideImage();
                moveSlider();
                return addListenerForSlideTransitionFinish();
            })
            .then(() => {
                togglePresentationalSlide();
                return addListenerForPresentationSlideFade();
            })
            .then(() => {
                transitionActive = false;
            });
        togglePresentationalSlide();

    });

    $('.slider-prev').click(function() {
        if (currentSlidePosition === 0 || transitionActive) {
            return;
        }
        transitionActive = true;
        --currentSlidePosition;
        currentSliderOffset += 50;
        addListenerForPresentationSlideFade()
            .then(() => {
                changePresentationalSlideImage();
                moveSlider();
                return addListenerForSlideTransitionFinish();
            })
            .then(() => {
                togglePresentationalSlide();
                return addListenerForPresentationSlideFade();
            })
            .then(() => {
                transitionActive = false;
            });
        togglePresentationalSlide();

    });


    $(".plus-slider-button").click(function(e) {
        let nextSlidePosition = this.getAttribute('data-slideNum');
        if (currentSlidePosition === nextSlidePosition || transitionActive) {
            return;
        }
        transitionActive = true;
        currentSlidePosition = nextSlidePosition;
        currentSliderOffset = -25 + (currentSlidePosition * -50);
        addListenerForPresentationSlideFade()
            .then(() => {
                changePresentationalSlideImage();
                moveSlider();
                return addListenerForSlideTransitionFinish();
            })
            .then(() => {
                togglePresentationalSlide();
                return addListenerForPresentationSlideFade();
            })
            .then(() => {
                transitionActive = false;
            });
        togglePresentationalSlide();
    });


    /**********************
     * Helpers
     **********************/
    function setTranslateX(element, position) {
        $(element).css({
            transform: `translateX(${position}%)`
        });
    }

    function changePresentationalSlideImage(e) {
        //change url reference of the presentationSlide, pull off corresponding active-slide
        $($presentationalSlide.children("img")[0]).attr("src", slides[currentSlidePosition]);
    }

    function moveSlider(e) {
        setTranslateX($slides, currentSliderOffset);
    }

    function togglePresentationalSlide() {
        //fade out the current slide and reduce scale
        $(".presentational-slide").toggleClass('active-presentational-slide');
    }

    function addListenerForPresentationSlideFade() {
        return new Promise((resolve, reject) => {
            $presentationalSlide.one(transEndEventName, resolve);
        });
    }

    function addListenerForSlideTransitionFinish() {
        return new Promise((resolve, reject) => {
            $slides.one(transEndEventName, resolve);
        });
    }

});
