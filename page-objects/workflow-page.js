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
    this.addFormButtonbtn = "//html/body/main/div/div/div/div[2]/div[2]/div/div/div/div[2]/div/div/div/div[4]/div/div[2]/div[2]/button";// bash bro help me 
    this.shortAnswerButtonbtn = '//span[contains(text(), "Short Answer")]';
    this.paraAnswerButton = '//span[contains(text(), "Paragraph")]'
    this.multipleChoiceButton = '//span[contains(text(), "Multiple Choice")]';
    this.photoEvidenceButton='//span[contains(text(), "Photo Evidence")]';  
    this.shortLabelPlaceholder='//input[@placeholder="Field label"][1]'
    this.paraLabelPlaceholder='//input[@placeholder="Field label"][2]'
    this.multipleLabelPlaceholder='//input[@placeholder="Field Label"]'
    this.photoEvidencePlaceholder='//input[@placeholder="Photo Label"]'
    this.shortAnsPlaceholder='//input[@placeholder="Answer Placeholder"]'
    this.paraAnsPlaceholder= '//textarea[@id="answer-placeholder"]'
    this.multipleAns1Placeholder='//input[@placeholder="Add Option"][1]'
    this.multipleAns2Placeholder='//input[@placeholder="Add Option"][2]'
    this.multipleAns3Placeholder='//input[@placeholder="Add Option"][3]'
    this.pageIsNotAccessable='//html/body/main/div/div/div/div[2]'
    this.optionsButton='//html/body/main/div/div/div/div[2]/div[1]/div[2]/div[1]/div[2]/div[2]/button' // bash bro help me 
    this.deleteWorkflowButton="//button[.//span[contains(text(),'Delete Workflow')]]"
    this.conformDeleteButton='//button[contains(text(), "Delete")]'
    this.searchWorkflowFiels='//input[@placeholder="Search Workflow"]'
    this.noDataText='//p[contains(text(),"No Data")]'
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
    await this.page.fill(this.searchWorkflowFiels, workflowID)
  }

  async noSearchFound(){
    await this.page.locator(this.noDataText).isVisible()
  }
}

module.exports = WorkflowPage;
