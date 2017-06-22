$(document).ready(function() {
            console.log("ready!");


            let currentSlidePosition = 0;
            //should pull this from the initial load
            let currentSliderOffset = 25;
            //attached event listener to slider-next button
            $('.slider-next').click(function() {
                fadeOutPresentationalSlide();
                ++currentSlidePosition;
                currentSliderOffset -= 50;
                //grab the .slider, pull the data value off of the item, multiply the translation
                let $slides = $('.slides');
                $slides.css({
                    transform: `translateX(${currentSliderOffset}%)`
                });
                fadeInPresentationalSlide();
            });
            $('.slider-prev').click(function() {
                fadeOutPresentationalSlide();
                --currentSlidePosition;
                currentSliderOffset += 50;
                //grab the .slider, pull the data value off of the item, multiply the translation
                let $slides = $('.slides');
                $slides.css({
                    transform: `translateX(${currentSliderOffset}%)`
                });
                fadeInPresentationalSlide();
            });


            function fadeOutPresentationalSlide() {
                console.log("fade out");
                //fade out the current slide and reduce scale
                return new Promise((resolve, reject) => {
                        $(".presentational-slide").css({
                            transform: "scale(1.0)"
                        });
                    });
                    //wait until translation has finished
                    //fade in and scale next slide
                }

                function fadeInPresentationalSlide() {
                    console.log("fade in");
                    //fade out the current slide and reduce scale
                    $(".presentational-slide").css({
                        transform: "scale(1.025)"
                    });
                    //wait until translation has finished
                    //fade in and scale next slide
                }

                function slideTransition() {
                    $(".myClass").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
                        function() {
                            //do something
                        });
                }


            });
