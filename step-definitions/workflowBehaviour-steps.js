const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const WorkflowPage = require('../page-objects/workflow-page')
const workflowstepspage=require('../page-objects/workflowStep-page')
require('dotenv').config();

let workflowUrl;
let modifiedUrl;
let workflowID;


Given(/^I click on the createWorkflow$/, async function () {
    this.workflowPage = new WorkflowPage(this.page);
    await this.page.waitForTimeout(3000);
    await this.workflowPage.clickCreateWorkflowBtn()
});


When(/^I enter the Title and Description for the workflow$/, async function () {
    this.workflowPage = new WorkflowPage(this.page);
    await this.workflowPage.enterWorkflowTitle('AutomationFlow');
    await this.workflowPage.enterWorkflowDescription('AutomationDescritption')
});

When(/^I click on sumbit workflow button$/, async function () {
    this.workflowPage = new WorkflowPage(this.page)
    await this.workflowPage.submitWorkflowButton();
})


When(/^I Upload Set of Images to the steps$/, async function () {
    this.workflowStepPage = new WorkflowPage(this.page);
    await this.workflowStepPage.uploadImageAndVideo()
    await this.page.waitForTimeout(3000);
});

When(/^I Add forms to the workfolow$/, async function () {
    this.workflowStepPage = new WorkflowPage(this.page);
    await this.workflowStepPage.addFormButton();
    await this.workflowStepPage.addShortAnswer()
    await this.workflowStepPage.addFormButton();
    await this.workflowStepPage.addParagraphAnswer()
    await this.workflowStepPage.addFormButton();
    await this.workflowStepPage.addMultipleChoice()
    await this.workflowStepPage.addFormButton();
    await this.workflowStepPage.addPhotoEvidence()
    await this.page.waitForTimeout(3000);
});

When('I Fill up the forms', async function () {
    const workflowPage = new WorkflowPage(this.page); 
    await workflowPage.fillForms(); 
  });
  
/////////////////////////////////////////

Given('I get the workflow URL', async function () {
    this.workflowStepPage = new WorkflowPage(this.page);
    workflowUrl = await this.workflowStepPage.getPageUrl();
    workflowID = workflowUrl.split('/workflows/')[1].split('/')[0];
    // console.log("test",workflowUrl)
});

When('I modify the tenent in the URL and vivit the page', async function () {
    const workflowPage = new WorkflowPage(this.page);
    modifiedUrl = workflowUrl.replace('ucdemo', 'mobileuat');;
    await workflowPage.visitURL(modifiedUrl);    
});

Then('The page must not be accessable', async function () {
    this.workflowStepPage = new WorkflowPage(this.page);
    await this.workflowStepPage.notAccessableMessage();
});

/////////////////////////////////////////

When('I visit the editing workflow', async function () {
  await this.page.goto(workflowUrl);

});

When('I delete the workflow', async function () {
    this.workflowPage = new WorkflowPage(this.page);
    await this.workflowPage.clickDeleteButton();
    await this.workflowPage.confirmDelete();
});

Then('I check the workflow is deleted', async function () {
    this.workflowPage= new WorkflowPage(this.page)
    await this.workflowPage.searchWorkflow();
    await this.workflowPageq.noSearchFound(workflowID);
});