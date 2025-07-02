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
    this.signInButton = "//a[@id='createAccount']"
    this.sendCodeButton="//button[@class='sendCode']"
    this.verificationCodeInput="//input[@id='emailVerificationCode']"
    this.verifyCodeSubmitButton="//div[@class='buttons']//button[contains(@class, 'verifyCode')]"
    this.newPasswordInput="//div[@class='attrEntry']//input[@id='newPassword']"
    this.conformPasswordInput="//div[@class='attrEntry']//input[@id='reenterPassword']"
    this.continueButton="//div[@class='buttons']//button[@id='continue']"
    this.forgetPassword='//div[@class="forgot-password center-height"]'
  }

  async loginAdmin(){
    await this.page.goto(process.env.BASE_URL);
    await this.page.waitForTimeout(5000);
    await this.page.fill(this.emailInput, process.env.USERNAME);
    await this.page.fill(this.passwordInput, process.env.PASSWORD);
    await this.page.click(this.loginButton);
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
  
  
  async clickSendCode(){
    await this.page.click(this.sendCodeButton)
  }
  async getPageTitle() {
    return await this.page.title();
  }

  async verifyCodeSubmit(){
    await this.page.click(this.verifyCodeSubmitButton)
  }

  async newPassword(password){
    await this.page.fill(this.newPasswordInput, password)
  }

  async conformPassword(password){
    await this.page.fill(this.conformPasswordInput, password)
  }

  async continue(){
    await this.page.click(this.continueButton)
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

  async forgetPasswordLink(){
    await this.page.click(this.forgetPassword)
  };

  
  async verificationCode(otp){
    await this.page.fill(this.verificationCodeInput, otp)
  }
}

module.exports = LoginPage;