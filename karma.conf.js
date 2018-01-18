// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');

module.exports = function (config) {

  config.set({

    // increasing the timeout limits to reduce the cases where circleci fails
    // with the message "Disconnected (1 times), because no message in 10000 ms"
    browserNoActivityTimeout : 60000, //default 10000
    browserDisconnectTimeout : 10000, // default 2000
    browserDisconnectTolerance : 1, // default 0
    captureTimeout: 60000,

    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-junit-reporter'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-spec-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      dir: path.join(__dirname, 'tests', 'coverage'),
      fixWebpackSourcePaths: true
    },
    junitReporter: {
      outputDir: path.join(__dirname, 'tests'),
      outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: false // add browser name to report and classes names
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['spec', 'junit', 'coverage-istanbul']
      : ['spec', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
  });
};
