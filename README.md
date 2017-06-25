Site is hosted at http://mjbikes.surge.sh/
To see build files on Github visit https://github.com/rttomlinson/mjbikepage

To run this website locally, navigate to the public directory and open index.html
The public directory contains all the necssary files for this site to work offline and is the directory that is hosted on http://mjbikes.surge.sh/

This project was designed for screen size of at least 960px, but also has some scaling capabilities. Resize the browser or visit the site on your phone!
Additionally, images were resized to respond to screen width and optimized to decrease total file transfer size.

package.json has scripts for running gulp tasks
Full-build automation with "npm run build"
Additional scripts can be viewed in the gulpfile.js and package.json

pages and templates are for the html templates (nunjucks templating engine)
sass contains the sass files
raw-assets are the original image/asset files before any resizing or optimization
data.json contains the information used to generate the html
gulpfile.js and package.json show some of the tooling used in automating the build process



Tools:
JQuery
Sass
Nunjucks for HTML Templating (templates and pages directory)
Gulp - Task Runner
ImageMagik
-----------------------------
Data for building HTML is in data.json




Future exploration:

* Front-end Frameworks
* Babel - As browser support requires
* Explore Shims and Polyfills - As browser support requires
* Modernizer - As browser support requires
* Minifying/Uglifying code
* SVG logos and buttons
* Setting up automated cross-browser Javascript testing https://philipwalton.com/articles/learning-how-to-set-up-automated-cross-browser-javascript-unit-testing/


Thank you for looking over this project and please let me know if you have any questions.

Project Notes:

Notes:
1. Add normalize.scss
2. Building out basic HTML and CSS/JS dirs
3. Install Sass
4. Break apart mock
6. Add fonts
7. Prevent transitionevents from firing twice https://www.iambacon.co.uk/blog/prevent-transitionend-event-firing-twice
8. Reduce file transfer size from ~5-6mb to 1.6mb --> 1.1mb @ 70 quality --> 3.0mb at 100 quality.
9. Responsive Sized Images
10. Simple responsive layout for mobile and tablet
11. Build process is automated via gulp


