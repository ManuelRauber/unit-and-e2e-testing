# Testing

## Requirements

* NodeJS: https://nodejs.org/
* Node-Static: `npm install -g node-static`
* Gulp: `npm install -g gulp`
* Karma: `npm install -g karma`
* Packages:
    * angular: Angular 1.4 sources
    * angular-material: Material Design for AngularJS
    * del: To clean up the build folder
    * gulp-concat: For concatenating the source files
    * gulp-babel: To transpile from ES6 to ES5
    * gulp-typscript: To transpile from TypeScript to ES6
    * jasmine: Testing framework
    * karma: Test runner
    * tsd: For TypeScript definitions of external modules
    * typescript: For the current version of typescript
* To install the packages: `npm install gulp-concat gulp-babel gulp-typescript jasmine karma tsd`.
* **OR** after cloning this repo: `npm install`, it will install the dependencies automatically.
* For Typing please use cmd command `node_modules/.bin/tsd reinstall --save --overwrite`.

## Running

Run `static` in the root of this repo, before executing the tests. Point your browser to `http://localhost:8080/source/app/index.html`.

## Scripts

The following scripts are included in this package:

* `build.sh`: Builds the sources. Equivalent to cmd command `gulp`.
* `test.sh`: Builds and runs the tests. Equivalent to cmd command `gulp tests`.
* `watch.sh`: Automatically builds the sources when a change has been detected. Equivalent to cmd command `gulp watch`.
* `watchTests.sh`: Same as `watch.sh` and will run the tests. Equivalent to cmd command `gulp watch-tests.
* Use cmd command `protractor` to 

## Notes

Expect some errors from TypeScript when building, since it will not find every dependend typing. This will not break the application. 