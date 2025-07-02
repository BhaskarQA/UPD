const { expect } = require('@playwright/test')

class  WorkflowPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.createWorkflowBtn = '//button[contains(@class,"rizzui-button")]';
    this.workflowTitleInput = '//input[@id="flow-name"]';
    this.workflowDescriptionInput = '//textarea[@id="flow-description"]';
    this.submitWorkflowBtn = '(//button[contains(@class,"rizzui-button")])[3]';
    this.uploadImageAndVideoTitle = '//p[contains(text(),"Choose file")]';
    this.addFormButtonbtn = "//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[2]/div[2]/button";
    this.shortAnswerButtonbtn = '//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[3]/div/ul/li[1]';
    this.paraAnswerButton = '//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[3]/div/ul/li[2]';
    this.multipleChoiceButton = '//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[3]/div/ul/li[3]';
    this.photoEvidenceButton='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[3]/div/ul/li[4]';  
    this.shortLabelPlaceholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[1]/div/input'
    this.paraLabelPlaceholder=' //html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[2]/div/div/div/input'
    this.multipleLabelPlaceholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[3]/div/div[2]/input'
    this.photoEvidencePlaceholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[4]/div/input'
    this.shortAnsPlaceholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[1]/div/div[2]/input'
    this.paraAnsPlaceholder= '//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[2]/div/div[2]/div[2]/textarea'
    this.multipleAns1Placeholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[3]/div/div[2]/div[1]/div/input'
    this.multipleAns2Placeholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[3]/div/div[2]/div[2]/div/input'
    this.multipleAns3Placeholder='//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[5]/div[3]/div/div[2]/div[3]/div/input'
    this.pageIsNotAccessable='//html/body/main/div/div/div/div[2]'
    this.optionsButton='//html/body/main/div/div/div/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/button'
    this.deleteWorkflowButton="//button[.//span[contains(text(),'Delete Workflow')]]"
    this.conformDeleteButton='//html/body/main/div/div/div/div[2]/div[3]/div/div[3]/div[2]'
    this.searchWorkflowFiels='//html/body/main/div/div/div[3]/div[1]/div[1]/div/label/span'
    this.noDataText='//html/body/main/div/div/div[3]/div[2]/div/div/table/tbody/tr/td/div/p'


  };

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

  async uploadImageAndVideo() {
    await this.page.click(this.uploadImageAndVideoTitle)
    await this.page.setInputFiles('input[type="file"]', [
      'inputFiles/image1.jpg',
      'inputFiles/image2.jpg',
      'inputFiles/image3.jpg'
    ]);
  }

  async addFormButton() {
    await this.page.click(this.addFormButtonbtn)
  }
  async addShortAnswer()
  {
    await this.page.click(this.shortAnswerButtonbtn)
  }

  async addParagraphAnswer()
  {
    await this.page.click(this.paraAnswerButton)
  }

  async addMultipleChoice()
  {
    await this.page.click(this.multipleChoiceButton)
  }

  async addPhotoEvidence(){
    await this.page.click(this.photoEvidenceButton)
  }
  async fillForms(){
    await this.page.fill(this.shortLabelPlaceholder, "Give us a short Short Answer")
    await this.page.fill(this.shortAnsPlaceholder, "Answer")
    await this.page.fill(this.paraLabelPlaceholder, "Explain in Paragraph ")
    await this.page.fill(this.paraAnsPlaceholder, "Paragraph Answer")
    await this.page.fill(this.multipleLabelPlaceholder, "Multiple Answers")
    await this.page.fill(this.multipleAns1Placeholder, "red")
    await this.page.fill(this.multipleAns2Placeholder, "blue")
    await this.page.fill(this.multipleAns3Placeholder, "Green")
    await this.page.fill(this.photoEvidencePlaceholder, "Photo Evidence")
  }
  async visitURL(modifiedURL){
    await this.page.goto(modifiedURL)
  }
  async notAccessableMessage(){
    const errorMsg= await this.page.locator(this.pageIsNotAccessable).textContent()
    expect(errorMsg).toContain("The workflow you're trying to access doesn't exist or  may have been removed.");
  }

  async clickDeleteButton(){
    await this.page.waitForTimeout(8000);
    await this.page.click(this.optionsButton)
    await this.page.click(this.deleteWorkflowButton)
  }
  async getPageUrl(){
    let pageUrl= await this.page.url();
    return pageUrl;
  }
async confirmDelete(){
  await this.page.click(this.conformDeleteButton)
}

async searchWorkflow(workflowID){
  await this.page.fill(workflowID)
}

async noSearchFound(){
  const errMsg=await this.page.locator(this.noDataText).textContent()
  expect(errMsg).toContain('No Data')
}

}

module.exports = WorkflowPage;
