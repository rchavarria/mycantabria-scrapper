/**
 * Configuration based on the original:
 * https://github.com/karma-runner/karma/blob/master/test/client/karma.conf.js
 */

module.exports = function(config) {
  config.set({
    basePath: '..',

    frameworks: ['jasmine', 'commonjs'],

    // list of files / patterns to load in the browser
    files: [
//      'src/scripts/**/*.js',
      'test/scripts/**/*.js'
    ],

    // list of files to exclude
    exclude: [
//      'client/main.js'
    ],

    preprocessors: {
//      'src/scripts/**/*.js': ['commonjs'],
      'test/scripts/**/*.js': ['commonjs']
    },

    // use dots reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress'
    // CLI --reporters progress
    reporters: ['progress'],
//    reporters: ['progress', 'junit'],

//    junitReporter: {
//      // will be resolved to basePath (in the same way as files/exclude patterns)
//      outputFile: 'test-results.xml'
//    },

    // web server port
    // CLI --port 9876
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // CLI --log-level debug
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
//    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    browsers: ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 20000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: true,

    // report which specs are slower than 500ms
    // CLI --report-slower-than 500
    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
//      'karma-chrome-launcher',
//      'karma-firefox-launcher',
//      'karma-junit-reporter',
      'karma-commonjs'
    ]
  });
};
