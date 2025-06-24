// helpers/auth-helper.js
const { chromium } = require('@playwright/test');
require('dotenv').config();

/**
 * Helper class for authentication-related functions
 */
class AuthHelper {
    /**
     * Login to the application and return authenticated browser context
     * @returns {Promise<Object>} Object containing browser, context, and page
     */
    static async login() {
        const browser = await chromium.launch();
        const context = await browser.newContext({
            recordVideo: { dir: 'videos/' },
            viewport: { width: 1280, height: 720 }
        });

        const page = await context.newPage();

        // Navigate to login page
        await page.goto(process.env.BASE_URL);

        // Fill in login credentials
        await page.fill("//input[@id='email']", process.env.USERNAME);
        await page.fill("//input[@id='password']", process.env.PASSWORD);

        // Click login button
        await page.click('button[type="submit"]');

        // Wait for navigation to complete
        await page.waitForURL('**/dashboard');

        // Store authentication state
        await context.storageState({ path: './auth.json' });

        return { browser, context, page };
    }

    /**
     * Create a new browser context with existing authentication state
     * @returns {Promise<Object>} Object containing browser, context, and page
     */
    static async getAuthenticatedContext() {
        const browser = await chromium.launch();

        // Use stored authentication state if available
        let context;
        try {
            context = await browser.newContext({
                storageState: './auth.json',
                recordVideo: { dir: 'videos/' },
                viewport: { width: 1280, height: 720 }
            });
        } catch (error) {
            console.log('No stored auth state found, performing fresh login');
            const result = await this.login();
            return result;
        }

        const page = await context.newPage();
        return { browser, context, page };
    }
}

module.exports = { AuthHelper };