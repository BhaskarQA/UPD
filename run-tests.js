const { execSync } = require('child_process');
const { sendReportEmail } = require('./helpers/email-report');

async function runTestsAndSendReport() {
    try {
        console.log('Starting web test execution...');

        // Run the tests and generate JSON report
        execSync('npm test', { stdio: 'inherit' });
        console.log('Tests completed.');

        // Generate HTML report
        execSync('npm run report', { stdio: 'inherit' });
        console.log('Report generated.');

        // Send email with report
        await sendReportEmail();
        console.log('Email sent. Process complete!');
    } catch (error) {
        console.error('Error in test execution process:', error);

        // Even if tests fail, try to generate and send the report
        try {
            execSync('npm run report', { stdio: 'inherit' });
            await sendReportEmail();
            console.log('Report sent despite test failures.');
        } catch (reportError) {
            console.error('Failed to send report after test failure:', reportError);
        }
    }
}

// If this script is run directly (not imported)
if (require.main === module) {
    runTestsAndSendReport().catch(console.error);
}

module.exports = { runTestsAndSendReport };