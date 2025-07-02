const { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

setDefaultTimeout(60 * 1000);

const screenshotsDir = path.join(__dirname, 'screenshots');
const videosDir = path.join(__dirname, 'videos');
[screenshotsDir, videosDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

let browser;
let context;
let page;
let currentFeature;

// Launch browser once
BeforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 50 });
  console.log('Browser launched');
});

// Create context/page once per feature
Before(async function (scenario) {
  const featureName = scenario.gherkinDocument.feature.name;

  // Only re-init context if the feature changes
  if (currentFeature !== featureName) {
    currentFeature = featureName;

    if (context) await context.close();

    context = await browser.newContext({
      recordVideo: { dir: videosDir }
    });

    page = await context.newPage();

    // Save on 'this' so steps can access it
    this.context = context;
    this.page = page;

    // Optional: login once per feature
    await loginOncePerFeature(context, page);
  } else {
    // Reuse the same context/page
    this.context = context;
    this.page = page;
  }
});

// Close context after the feature (simulated using After with tracking)
After(async function (scenario) {
  this.testInfo = { scenarioName: scenario.pickle.name };

  if (scenario.result.status === Status.FAILED && this.page) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const scenarioName = scenario.pickle.name.replace(/\s+/g, '-').toLowerCase();
    const screenshotPath = path.join(screenshotsDir, `${scenarioName}-${timestamp}.png`);

    try {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      const screenshot = fs.readFileSync(screenshotPath);
      this.attach(screenshot, 'image/png');
    } catch (error) {
      console.error('Screenshot error:', error);
    }
  }

  // Simulate feature end: if it's the last scenario of the feature
  const nextFeatureName = scenario.gherkinDocument?.feature?.name;
  if (nextFeatureName !== currentFeature && context) {
    await context.close();
    context = null;
    page = null;
    console.log(`Closed context for feature: ${currentFeature}`);
    currentFeature = null;
  }
});

// Close browser once
AfterAll(async () => {
  if (browser) await browser.close();
  console.log('Browser closed');
});

// Helper: login and save auth state
async function loginOncePerFeature(context, page) {
  const authFile = path.join(__dirname, 'auth.json');
  if (fs.existsSync(authFile)) {
    const storageState = JSON.parse(fs.readFileSync(authFile, 'utf8'));
    await context.addCookies(storageState.cookies || []);
    console.log('Auth loaded');
  } else {
    await page.goto(process.env.BASE_URL);
    await page.fill("//input[@id='email']", process.env.USERNAME);
    await page.fill("//input[@id='password']", process.env.PASSWORD);
    await page.click("//button[@type='submit']");
    await page.waitForNavigation();

    const state = await context.storageState();
    fs.writeFileSync(authFile, JSON.stringify(state));
    console.log('Auth saved');
  }
}
