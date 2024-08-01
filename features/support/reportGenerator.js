const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './reports/json/', // Path to the folder containing JSON reports
  reportPath: './reports/html/', // Path to the output HTML report
  metadata:{
    browser: {
      name: 'chrome',
      version: '91127'
    },
    device: 'Local Test Machine',
    platform: {
      name: 'Windows',
      version: '10'
    }
  },
  customData: {
    title: 'Regression Report',
    data: [
      {label: 'Project', value: 'Sauce Demo'},
      {label: 'Release', value: '1'},
      {label: 'Cycle', value: 'B11221.34321'},
      {label: 'Execution Start Time', value: 'Aug 1st 2024, 10:00 AM EST'},
      {label: 'Execution End Time', value: 'Aug 1st 2024, 10:30 AM EST'}
    ]
  }
});