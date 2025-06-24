const cron = require('node-cron');
const { execSync } = require('child_process');
const path = require('path');

// Schedule web tests to run every weekday at 8:00 AM
cron.schedule('0 8 * * 1-5', () => {
    console.log('Running scheduled web tests at', new Date().toISOString());

    try {
        // Change to the project directory if needed
        process.chdir(path.join(__dirname));

        // Run the test script
        execSync('node run-tests.js', { stdio: 'inherit' });

        console.log('Scheduled web tests completed successfully at', new Date().toISOString());
    } catch (error) {
        console.error('Error running scheduled web tests:', error);
    }
});

// Schedule weekend tests at a different time
cron.schedule('0 9 * * 0,6', () => {
    console.log('Running weekend web tests at', new Date().toISOString());

    try {
        // Change to the project directory if needed
        process.chdir(path.join(__dirname));

        // Run the test script
        execSync('node run-tests.js', { stdio: 'inherit' });

        console.log('Weekend web tests completed successfully at', new Date().toISOString());
    } catch (error) {
        console.error('Error running weekend web tests:', error);
    }
});

console.log('Web test scheduler started. Tests will run on the following schedule:');
console.log('- Weekdays: 8:00 AM');
console.log('- Weekends: 9:00 AM');