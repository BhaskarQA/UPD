const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { remote } = require('webdriverio');

// Function to start Appium server
async function startAppiumServer() {
    console.log('Starting Appium server...');

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create log file streams
    const logFile = fs.createWriteStream(path.join(logsDir, 'appium.log'), { flags: 'a' });
    const errorLogFile = fs.createWriteStream(path.join(logsDir, 'appium-error.log'), { flags: 'a' });

    // Start Appium server process
    const appiumServer = spawn('npx', ['appium'], {
        shell: true
    });

    // Pipe output to log files
    appiumServer.stdout.pipe(logFile);
    appiumServer.stderr.pipe(errorLogFile);

    // Log output for debugging
    appiumServer.stdout.on('data', (data) => {
        console.log(`Appium: ${data.toString().trim()}`);
    });

    appiumServer.stderr.on('data', (data) => {
        console.error(`Appium Error: ${data.toString().trim()}`);
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('Appium server started');
    return appiumServer;
}

// Function to stop Appium server
async function stopAppiumServer(server) {
    if (server) {
        console.log('Stopping Appium server...');
        server.kill();
        console.log('Appium server stopped');
    }
}

// Function to find element with retry
async function findElementWithRetry(driver, selector, maxRetries = 3) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            return await driver.$(selector);
        } catch (error) {
            retries++;
            if (retries === maxRetries) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// Function to wait for element to be visible
async function waitForElementVisible(driver, selector, timeout = 10000) {
    const element = await driver.$(selector);
    await element.waitForDisplayed({ timeout });
    return element;
}

// Function to get element text with retry
async function getElementTextWithRetry(driver, selector, maxRetries = 3) {
    const element = await findElementWithRetry(driver, selector, maxRetries);
    return await element.getText();
}

module.exports = {
    startAppiumServer,
    stopAppiumServer,
    findElementWithRetry,
    waitForElementVisible,
    getElementTextWithRetry
};