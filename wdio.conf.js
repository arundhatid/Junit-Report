const path = require("path");
const { join } = require("path");
exports.config = {
  //
  // ====================
  // Runner Configuration
  // ====================
  //
  //
  // ==================
  // Specify Test Files
  // ==================
  // Define which test specs should run. The pattern is relative to the directory
  // from which `wdio` was called.
  //
  // The specs are defined as an array of spec files (optionally using wildcards
  // that will be expanded). The test for each spec file will be run in a separate
  // worker process. In order to have a group of spec files run in the same worker
  // process simply enclose them in an array within the specs array.
  //
  // If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
  // then the current working directory is where your `package.json` resides, so `wdio`
  // will be called from there.
  //

  baseUrl: process.env,
  suites: {
    
    REGRESSION: [
      [
        "./test/specs/RegressionTests/001.test1.spec.js",
        "./test/specs/RegressionTests/933741.test2.spec.js",
        "./test/specs/RegressionTests/933741.test3.spec.js",
    
      ],
    ],
  
  },

  specs: ["./test/specs/**/*.js"],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  
  
  capabilities: [
    {
      // maxInstances can get overwritten per capability. So if you have an in-house Selenium
      // grid with only 5 firefox instances available you can make sure that not more than
      // 5 instances get started at a time.
      maxInstances: 5,
      //
      browserName: "chrome",
      "goog:chromeOptions": {
        args: [
          "--lang=en-US",
          "--no-sandbox",
          "--incognito",
          '--headless',
          "--autoplay-policy=no-user-gesture-required", // https://developer.chrome.com/blog/autoplay/
          //'user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
          "--log-level=3", // Disable unusual logging in windows run
          "--disable-gpu",
          "--start-maximized",
          "--disable-popup-blocking",
          "--profile-directory=Default",
          "--disable-infobars",
          "--ignore-certificate-errors",
          "--disable-plugins-discovery",
          "--disable-dev-shm-usage",
          "--no-service-autorun",
          "--no-default-browser-check",
          "--disable-blink-features=AutomationControlled",
          "--disable-infobars",
          "--disable-browser-side-navigation",
          "--disable-translate",
          "--disable-extensions",
          "--allow-insecure-localhost",
          "--window-size=1920,1080", // This is browser size
          "--disable-features=VizDisplayCompositor",
          "--disable-prompt-on-repost",
          "--new-window",
          //"--headless",
        ],
      },
      acceptInsecureCerts: true,
      },
  ],
  logLevel: "silent",
  logLevels: {
    webdriver: "info",
    "@wdio/appium-service": "info",
  },
  //
  // If you only want to run your tests until a specific amount of tests have failed use
  // bail (default is 0 - don't bail, run all tests).
  bail: 0,
  baseUrl: "http://localhost",
  //
  // Default timeout for all waitFor* commands.
  waitforTimeout: 90000,
  //
  // Default timeout in milliseconds for request
  // if browser driver or grid doesn't send response
  connectionRetryTimeout: 120000,
  //
  // Default request retries count
  connectionRetryCount: 3,
  //
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 1200000,
  },
  beforeSuite: function (suite) {},
  afterTest: function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {},

  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
    test, context, { error, result, duration, passed, retries };
  },
  reporters: ['spec',    
    ['junit', {
        outputDir: './reports',   
        outputFileFormat: function(options) { // optional
            return `mycustomfilename.xml`
        }
    }]
  ],  
};
