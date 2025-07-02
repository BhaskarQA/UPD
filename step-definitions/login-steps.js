const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LoginPage = require('../page-objects/login-page');
const { MailSlurp } = require('mailslurp-client');
const axios = require('axios');
const MAILINATOR_API_KEY = process.env.MAILINATOR_API_KEY;
const inboxName = 'ucentrics_test_inbox'; // pick any name
const emailAddress = `${inboxName}@mailinator.com`;



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

  
  When('I click on forget password, enter and verify email', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.forgetPasswordLink();
  
    const inbox = sharedContext.inbox;
    const mailslurp = sharedContext.mailslurp;
  
    if (!inbox || !mailslurp) {
      throw new Error('Shared inbox or MailSlurp not found. Make sure it is created in a previous scenario.');
    }
  
    await this.page.fill('input[id="email"]', inbox.emailAddress);
    await this.loginPage.clickSendCode();
    await this.loginPage.waitForTimeout(20000); // not proper solution need to comeup with new implementation
    const email = await mailslurp.waitForLatestEmail(inbox.id,);
    const otpMatch = email.body.match(/Your code is: (\d{6})/);
    const otp = otpMatch ? otpMatch[1] : null;
  
    if (!otp) {
      throw new Error('OTP not found in the email body!');
    }
  
    await this.loginPage.verificationCode(otp);
    await this.loginPage.verifyCodeSubmit();
    await this.loginPage.continue();
  });
  
  Then('I completing the password reset with new password', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.newPassword(process.env.PASSWORD);
    await this.loginPage.conformPassword(process.env.PASSWORD);
    await this.loginPage.continue();
    await this.page.waitForTimeout(10000);
  });
  