Page is hosted at http://mjbikes.surge.sh/
Github for build files at https://github.com/rttomlinson/mjbikepage

package.json has scripts for running gulp tasks
Full-build automation with "npm run build"


Tools:
JQuery
Sass
Nunjucks for HTML Templating (templates and pages directory)
Gulp - Task Runner
-----------------------------
Data for building HTML is in data.json

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


Future exploration:

* Front-end Frameworks
* Babel - As browser support requires
* Explore Shims and Polyfills - As browser support requires
* Modernizer - As browser support requires
* Minifying/Uglifying code
* SVG logos and buttons
* Setting up automated cross-browser Javascript testing https://philipwalton.com/articles/learning-how-to-set-up-automated-cross-browser-javascript-unit-testing/