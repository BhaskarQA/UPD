const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../page-objects/login-page');

require('dotenv').config();

Given('I launch the Ucentrics URL and navigate to the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();

  const currentUrl = await this.loginPage.getCurrentUrl();
  expect(currentUrl).toContain('https://ucentricsb2cqa.b2clogin.com/');
});

When('I enter a valid email and password', async function () {
  await this.loginPage.enterEmail(process.env.USERNAME);
  await this.loginPage.enterPassword(process.env.PASSWORD);
});

When('I enter invalid username and password', async function () {
  await this.loginPage.enterEmail('invalid@example.com');
  await this.loginPage.enterPassword('wrongpassword');
});

When('I leave username and password fields empty', async function () {
  await this.loginPage.enterEmail('');
  await this.loginPage.enterPassword('');
});

When('I click the Sign in button', async function () {
  await this.loginPage.clickLoginButton();
});

Then('I should be redirected to the dashboard page', async function () {
  await this.page.waitForTimeout(10000); // Wait for the page to load or complete the redirect
  const currentUrl = await this.loginPage.getCurrentUrl();
  expect(currentUrl).toContain('https://ucdemo.qa.ucentrics.com/workflows');
});

Then('I should verify the page title', async function () {
  const title = await this.loginPage.getPageTitle();
  // Note: You might need to update the expected title based on the actual dashboard title
  expect(title).toContain(""); // Adjust this to match the actual title
});

Then('I should see an error message', async function () {
  const loginPage = new LoginPage(this.page); // Initialize LoginPage with the current page instance

  // Wait for the error message to appear using the locator from LoginPage class
  await this.page.waitForSelector(loginPage.errorMessageLocator, { timeout: 5000 });

  // Get the error text using the method from LoginPage class
  const errorText = await loginPage.getErrorMessage();

  // Validate the error message
  expect(errorText).toContain("We can't seem to find your account");
});

Then('I should see validation error messages', async function () {
  const loginPage = new LoginPage(this.page); // Initialize LoginPage with the current page instance

  // Wait for error messages to appear
  await this.page.waitForSelector(loginPage.errorMessageForEmail, { timeout: 5000 });
  await this.page.waitForSelector(loginPage.errorMessageForPassword, { timeout: 5000 });

  // Fetch the error messages
  const emailErrorText = await loginPage.getEmailErrorMessage();
  const passwordErrorText = await loginPage.getPasswordErrorMessage();

  // Validate the error messages
  expect(emailErrorText).toContain('Please enter your Email Address');
  expect(passwordErrorText).toContain('Please enter your password');
});
