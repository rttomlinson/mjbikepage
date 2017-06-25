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
     
    //retrieve image urls for all images in the slider
    let slideImages = getSlideImages();
    let lastSlide = slideImages.length - 1;
    let currentSlidePosition = 0;
    let currentSliderOffset = -25;
    let transitionActive = false;
    let $slides = $('.slides');
    let $presentationalSlide = $('.presentational-slide');

    /*********************
     * Attach slider listeners
     *********************/

    $('.slider-next').click(function() {
        if (transitionActive) {
            return;
        }
        let nextSlidePosition;
        if (currentSlidePosition === lastSlide) {
            nextSlidePosition = 0;
        }
        else {
            nextSlidePosition = currentSlidePosition + 1;
        }
        slideTransition(nextSlidePosition);
    });
    
    $('.slider-prev').click(function() {
        if (transitionActive) {
            return;
        }
        let nextSlidePosition;
        if (currentSlidePosition === 0) {
            nextSlidePosition = lastSlide;
        }
        else {
            nextSlidePosition = currentSlidePosition - 1;
        }
        slideTransition(nextSlidePosition);
    });

    $(".plus-slider-button").click(function(e) {
        let nextSlidePosition = +this.getAttribute('data-slideNum');
        if (currentSlidePosition === nextSlidePosition || transitionActive) {
            return;
        }
        slideTransition(nextSlidePosition);
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
        $($presentationalSlide.children("img")[0]).attr("src", slideImages[currentSlidePosition]);
    }

    function moveSlider(newPosition) {
        setTranslateX($slides, newPosition);
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

    function moveToNewSlide(newPosition) {
        addListenerForPresentationSlideFade()
            .then(() => {
                changePresentationalSlideImage();
                moveSlider(newPosition);
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
    }

    function updatePlusButtonActiveState(newSlidePosition) {
        //remove active from current slide
        let $plusSliderButtons = $(".plus-slider-button");
        $plusSliderButtons[currentSlidePosition].classList.remove("active-plus-button");
        //add active to new slide
        $plusSliderButtons[newSlidePosition].classList.add("active-plus-button");
    }

    function getSlideImages() {
        return $.map($(".slides").find("img"), (img) => {
            return img.src;
        });
    }

    function slideTransition(nextSlidePosition) {
        transitionActive = true;
        updatePlusButtonActiveState(nextSlidePosition);
        currentSlidePosition = nextSlidePosition;
        currentSliderOffset = -25 + (currentSlidePosition * -50);
        moveToNewSlide(currentSliderOffset);
    }

});
