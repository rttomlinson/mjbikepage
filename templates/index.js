const Handlebars = require('handlebars');
Handlebars.registerHelper('each', function(context, options) {
  var ret = "";
  console.log(context);
  console.log(options);
  for(var i=0, j=context.length; i<j; i++) {
    ret = ret + options.fn({left: context[i][0], top: context[i][1], slideNum: i});
  }

  return ret;
});
var source = "{{#each boxCoords}}<div data-slideNum={{slideNum}} style='left:{{left}}%; top:{{top}}%' class='slider-button'></div>{{/each}}";
var template = Handlebars.compile(source);
 
var data = { "boxCoords": [[52.5,35],[63.13,27.29],[66.67,43.86],[74.17,45.86],[79.79,52.14],[52.81,61.71],[64.69,81.14],[26.77,51.57],[24.69,5.14],[19.48,16.86],[34.48,11.29],[28.23,26.29],[10.42,29],[19.48,37.71]]};

var result = template(data);

console.log(result);