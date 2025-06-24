require('dotenv').config();
class LoginPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.emailInput = "//input[@id='email']";
    this.passwordInput = "//input[@id='password']";
    this.loginButton = "//button[@type='submit']";
    this.errorMessageLocator = "//div[@class='error pageLevel']//following-sibling::p"
    this.errorMessageForEmail = "(//div[@class='error itemLevel']//following-sibling::p)[1]"
    this.errorMessageForPassword = "(//div[@class='error itemLevel']//following-sibling::p)[2]"
  }

  async navigate() {
    await this.page.goto(process.env.BASE_URL);
    await this.page.waitForTimeout(8000);
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.page.waitForTimeout(2000);
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async getCurrentUrl() {
    return await this.page.url();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async getErrorMessage() {
    const errorElement = await this.page.locator(this.errorMessageLocator);
    return await errorElement.textContent();
  }

  async getEmailErrorMessage() {
    const emailErrorElement = await this.page.locator(this.errorMessageForEmail);
    return await emailErrorElement.textContent();
  }

  async getPasswordErrorMessage() {
    const passwordErrorElement = await this.page.locator(this.errorMessageForPassword);
    return await passwordErrorElement.textContent();
  }
}

module.exports = LoginPage;