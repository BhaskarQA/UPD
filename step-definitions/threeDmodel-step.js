const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const ThreeDModelPage = require('../page-objects/threeDModel-page')

require('dotenv').config();

When(/^I click the ARVR section$/, async function () {
    this.threeDModelPage = new ThreeDModelPage(this.page)
    await this.threeDModelPage.clickARandVRSection();
});

When('I click {string} and select {string}', async function (chooseFileText, uploadOption) {
    this.threedmodel = new ThreeDModelPage(this.page);
    await this.threedmodel.choose3DFiles();
    await this.page.waitForTimeout(5000);
    await this.threedmodel.fullscreeButton();
  });


