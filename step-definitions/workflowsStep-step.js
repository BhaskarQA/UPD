const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const WorkflowStepPage = require('../page-objects/workflowStep-page')

require('dotenv').config();


Then(/^I verify the workflow is created successfull$/, async function () {
    const workflowStepPage = new WorkflowStepPage(this.page)
    await this.page.waitForTimeout(3000);

    const getTextWorkflowTitleName = await workflowStepPage.getTextWorkflowTitle();

    //expect
    expect(getTextWorkflowTitleName).toContain('AutomationFlow')
});

When(/^I click the node$/, async function (dataTable) {
    this.workflowStepPage = new WorkflowStepPage(this.page);
    const nodeData = dataTable.hashes(); // [{ node: '1' }]

    const targetText = nodeData[0].node.trim();
    await this.workflowStepPage.clickNodeByText(targetText);
    await this.page.waitForTimeout(3000);
});

When(/^I fill the details for type section and instruction section$/, async function (dataTable) {
    const workflowStepPage = new WorkflowStepPage(this.page)
    const [row] = dataTable.hashes(); // gets the first row as an object

    const { Type, Instruction } = row;
    await this.page.waitForTimeout(3000);
    await workflowStepPage.fillType(Type);
    await workflowStepPage.fillInstruction(Instruction);
    await this.page.waitForTimeout(3000);
});


When(/^I create a another node in workflow$/, async function () {
    this.workflowStepPage = new WorkflowStepPage(this.page);
    await this.workflowStepPage.createNewNodeInFlow();
    await this.page.waitForTimeout(3000);
});
