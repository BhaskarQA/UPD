const { Given, When, Then } = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const WorkflowPage = require('../page-objects/workflow-page')
const WorkflowStepPage=require('../page-objects/workflowStep-page')

let workflowUrl

When('I Try to import a Workflow without replacing the first node' , async function () {
    this.workflowPage=new WorkflowPage(this.page)
    await this.workflowPage.importWorkflow();
    await this.workflowPage.importWithoutReplace();
})

When('i upload the required media to it', async function() {
    this.workflowPage=new WorkflowPage(this.page)
    await this.workflowPage.uploadMedia();
    await this.workflowPage.importButton();    
})

Then('I check the workflow is imported Without Replacing the previous nodes', async function(dataTable) {
    this.workflowStepPage = new WorkflowStepPage(this.page)
    this.workflowPage=new WorkflowPage(this.page)
    workflowUrl= await this.workflowStepPage.getPageUrl();
    const isVisible = await this.page.locator(this.workflowPage.nodeNumber7).isVisible();
    expect(isVisible).toBe(true);
    const [row] = dataTable.hashes(); 
    const { Type, Instruction } = row;
    expect(await this.workflowStepPage.getTypeText()).toContain(Type);
    expect(await this.workflowStepPage.getInstructionText()).toContain(Instruction);
})
Given('I visit the workflow', async function() {await this.page.goto(workflowUrl);})

When('I import workflow by replacing the nodes ', async function() {
    this.workflowPage=new WorkflowPage(this.page)
    await this.workflowPage.importWorkflow();
    await this.workflowPage.importAndReplace();
    await this.workflowPage.uploadMedia();
    await this.workflowPage.importButton();
})

Then('I check the workflow is imported by Replacing the previous nodes', async function(dataTable) {
    this.workflowStepPage = new WorkflowStepPage(this.page)
    this.workflowPage=new WorkflowPage(this.page)
    const isVisible = await this.page.locator(this.workflowPage.nodeNumber6).isVisible();
    expect(isVisible).toBe(true);
    const [row] = dataTable.hashes(); 
    const { Type, Instruction } = row;
    expect(await this.workflowStepPage.getTypeText()).toContain(Type);
    expect(await this.workflowStepPage.getInstructionText()).toContain(Instruction);
})