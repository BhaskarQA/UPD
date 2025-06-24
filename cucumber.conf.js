const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Set default timeout
setDefaultTimeout(60 * 1000);

// Ensure directories exist
const screenshotsDir = path.join(__dirname, 'screenshots');
const videosDir = path.join(__dirname, 'videos');
const reportsDir = path.join(__dirname, 'reports');

[screenshotsDir, videosDir, reportsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Global browser for the test suite
let browser;

// Launch browser before all tests
BeforeAll(async function () {
    browser = await chromium.launch({
        headless: false,
        slowMo: 50
    });
    console.log('Browser launched');
});

// Close browser after all tests
AfterAll(async function () {
    if (browser) {
        await browser.close();
        console.log('Browser closed');
    }
});

// Create new context and page for each scenario
Before(async function () {
    // Create a new browser context for each scenario
    this.context = await browser.newContext({
        recordVideo: {
            dir: videosDir
        }
    });

    // Create a new page in the context
    this.page = await this.context.newPage();

    // Store test info
    this.testInfo = {
        scenarioName: ''
    };

    // Attempt to login if needed
    try {
        // Check if we have stored auth state
        const authFile = path.join(__dirname, 'auth.json');
        if (fs.existsSync(authFile)) {
            // Use stored auth state
            const storageState = JSON.parse(fs.readFileSync(authFile, 'utf8'));
            await this.context.addCookies(storageState.cookies || []);
            console.log('Loaded authentication state from file');
        } else {
            // Perform login
            await this.page.goto(process.env.BASE_URL);
            await this.page.fill("//input[@id='email']", process.env.USERNAME);
            await this.page.fill("//input[@id='password']", process.env.PASSWORD);
            await this.page.click("//button[@type='submit']");

            // Wait for login to complete
            await this.page.waitForNavigation();

            // Save auth state for future tests
            const storageState = await this.context.storageState();
            fs.writeFileSync(authFile, JSON.stringify(storageState));
            console.log('Saved authentication state to file');
        }
    } catch (error) {
        console.error('Failed to setup authentication:', error);
        // Continue with the test, the specific step will handle login if needed
    }
});

// Take screenshot on failure and close page after each scenario
After(async function (scenario) {
    // Store scenario name for screenshot
    this.testInfo.scenarioName = scenario.pickle.name;

    if (scenario.result.status === Status.FAILED) {
        // Take screenshot on failure
        if (this.page) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const scenarioName = scenario.pickle.name.replace(/\s+/g, '-').toLowerCase();
            const screenshotPath = path.join(screenshotsDir, `${scenarioName}-${timestamp}.png`);

            try {
                await this.page.screenshot({ path: screenshotPath, fullPage: true });
                console.log(`Screenshot saved to: ${screenshotPath}`);

                // Attach screenshot to report
                const screenshot = fs.readFileSync(screenshotPath);
                this.attach(screenshot, 'image/png');
            } catch (error) {
                console.error('Failed to take screenshot:', error);
            }
        } else {
            console.error('Cannot take screenshot: page object is undefined');
        }
    }

    // Save video if it exists
    if (this.context) {
        await this.context.close();
    }
});