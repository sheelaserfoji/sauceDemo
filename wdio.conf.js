const path = require('path');
const fs = require('fs');
const report = require('multiple-cucumber-html-reporter');

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    // WebdriverIO supports running e2e tests as well as unit and component tests.
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================

    specs: [
        './features/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    //
    maxInstances: 10,

    capabilities: [{
        maxInstances: 10,
        browserName: 'chrome'
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    
    bail: 0,
    
    baseUrl: 'https://www.saucedemo.com',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,

  
    framework: 'cucumber',
    
     reporters: ['spec',
        ['cucumberjs-json', {
            jsonFolder: './reports/json/',
            language: 'en',
          }],
    ],

    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./stepDefinitions/*.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> Only execute the scenarios with name matching the expression (repeatable).
        name: [],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },

    retries: 0, //Retry failed tests up to 1 time
    // //
    // // =====
    // // Hooks
    // // =====
    
    onComplete: function (exitCode, config, capabilities, results) {
        // Run your JavaScript file after the tests are complete
        const { exec } = require('child_process');
        exec('node ../sauceDemo/features/support/reportGenerator.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing script: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    },
}
