const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const WorkflowPage = require('../page-objects/workflow-page')

require('dotenv').config();


When(/^I click on the createWorkflow$/, async function () {
    this.workflowPage = new WorkflowPage(this.page);
    await this.page.waitForTimeout(3000);
    await this.workflowPage.clickCreateWorkflowBtn()
});


When(/^I enter the Title and Description for the workflow$/, async function () {
    this.workflowPage = new WorkflowPage(this.page);
    await this.page.waitForTimeout(3000);
    await this.workflowPage.enterWorkflowTitle('AutomationFlow');
    await this.page.waitForTimeout(3000);
    await this.workflowPage.enterWorkflowDescription('AutomationDescritption')
});

When(/^I click on sumbit workflow button$/, async function () {
    this.workflowPage = new WorkflowPage(this.page)
    await this.page.waitForTimeout(3000);
    await this.workflowPage.submitWorkflowButton();
    await this.page.waitForTimeout(3000);

})




