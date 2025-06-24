const reporter = require('cucumber-html-reporter');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// Ensure the reports directory exists
const reportsDir = path.join(__dirname, '../reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Get current date and time for report name
const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
const reportName = `web_cucumber_report_${timestamp}`;

function generateReport() {
  const jsonFile = path.join(reportsDir, 'cucumber_report.json');

  // Check if the JSON report exists
  if (!fs.existsSync(jsonFile)) {
    console.error(`JSON report file not found: ${jsonFile}`);
    return null;
  }

  const options = {
    theme: 'bootstrap',
    jsonFile: jsonFile,
    output: path.join(reportsDir, `${reportName}.html`),
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
      "App Version": "1.0.0",
      "Test Environment": "QA",
      "Platform": "Web",
      "Browser": "Chrome",
      "Parallel": "Scenarios",
      "Executed": "Remote",
      "Report Generated": moment().format('YYYY-MM-DD HH:mm:ss')
    }
  };

  try {
    reporter.generate(options);
    console.log('HTML report generated at: ' + options.output);
    return options.output;
  } catch (error) {
    console.error('Error generating report:', error);
    return null;
  }
}

// If this script is run directly (not imported)
if (require.main === module) {
  generateReport();
}

module.exports = { generateReport, reportName };