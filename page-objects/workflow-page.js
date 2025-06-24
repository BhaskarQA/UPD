class WorkflowPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.createWorkflowBtn = '//button[contains(@class,"rizzui-button")]';
    this.workflowTitleInput = '//input[@id="flow-name"]';
    this.workflowDescriptionInput = '//textarea[@id="flow-description"]';
    this.submitWorkflowBtn = '(//button[contains(@class,"rizzui-button")])[3]';

  }

  async clickCreateWorkflowBtn() {
    await this.page.click(this.createWorkflowBtn)
  }

  async enterWorkflowTitle(title) {
    await this.page.fill(this.workflowTitleInput, title)
  }
  async enterWorkflowDescription(description) {
    await this.page.fill(this.workflowDescriptionInput, description)
  }

  async submitWorkflowButton() {
    await this.page.click(this.submitWorkflowBtn)
  }
}

module.exports = WorkflowPage;