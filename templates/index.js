const Handlebars = require('handlebars');
Handlebars.registerHelper('eachSliderButton', function(context, options) {
  let ret = "";
  for (let i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn({
      left: context[i][0],
      top: context[i][1],
      slideNum: i
    });
  }

  return ret;
});
var source = "{{#eachSliderButton boxCoords}}<div data-slideNum={{slideNum}} style='left:{{left}}%; top:{{top}}%' class='plus-slider-button'></div>{{/eachSliderButton}}";
var template = Handlebars.compile(source);

var data = {
  "boxCoords": [
    [52.5, 35],
    [63.13, 27.29],
    [66.67, 43.86],
    [74.17, 45.86],
    [79.79, 52.14],
    [52.81, 61.71],
    [64.69, 81.14],
    [26.77, 51.57],
    [24.69, 5.14],
    [19.48, 16.86],
    [34.48, 11.29],
    [28.23, 26.29],
    [10.42, 29],
    [19.48, 37.71]
  ]
};

var result = template(data);

console.log(result);
console.log("\n\n\n\n");

Handlebars.registerHelper('eachSlide', function(context, options) {
  let ret = "";
  for (let i = 0, j = context.length; i < j; i++) {
    ret = ret + options.fn({
      src: context[i].src,
      alt: context[i].alt,
      info: context[i].info,
      slideNum: i
    });
  }

  return ret;
});

var slide = `{{#eachSlide slidesData}}<div class="slide-wrapper" data-slidePosition={{slideNum}}>
                            <img src="{{src}}" alt="{{alt}}" />
                            <div class="descriptor-overlay">
                                <h4>Smith Overtake Helmet</h4>
                                <p>
                                    {{info}} <span>More Details</span>
                                </p>
                            </div>
                        </div>{{/eachSlide}}`;
var slideTemplate = Handlebars.compile(slide);
let helmetInfo = "As classic as a little black dress, the women's Smith Arrival Snow Helmet delivers the proven fit and function you expect from a Smith helmet, all with a ladylike polish and style.";
var slideData = {
  "slidesData": [{
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }, {
    src: "assets/smith-helmet-show.png",
    alt: "smith overtake helmet",
    info: helmetInfo
  }]
};

var slideResult = slideTemplate(slideData);

console.log(slideResult);
