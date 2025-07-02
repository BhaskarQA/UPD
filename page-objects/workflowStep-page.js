class WorkflowStepPage {
    
    constructor(page) {

        this.page = page;
        this.workflowTitleInInsideFlow = '(//input[@type="text"])[1]'
        this.nodeNumbers = '//div[@class="react-flow__nodes"]//div[contains(@class,"react-flow__node")]//input[@placeholder="Title"]//following::span[2]'
        this.typeInput = '//input[@placeholder="Step Title"]';
        this.instructionTextarea = '(//div[@class="ql-editor ql-blank"])[2]';
        this.createNewNode = '(//button[contains(@class,"rizzui-button active:enabled:translate-y-px")])[1]';
    }

    async getTextWorkflowTitle() {
        const workflowTitleName = await this.page.locator(this.workflowTitleInInsideFlow)
        return await workflowTitleName.inputValue();
    }

    async clickNodeByText(targetText) {
        const nodes = this.page.locator(this.nodeNumbers);
        const count = await nodes.count();
        console.log(`Found ${count} nodes`);
        for (let i = 0; i < count; i++) {
            const text = await nodes.nth(i).textContent();
            console.log(`Node ${i} text: "${text.trim()}"`);
            if (text.trim() === targetText) {
                await nodes.nth(i).click();
                console.log(`Clicked node with text: ${text}`);
                return;
            }
        }
        throw new Error(`No node found with text: ${targetText}`);
    }

   

    async fillType(type) {
        await this.page.fill(this.typeInput, type);
    }

    async fillInstruction(instruction) {
        await this.page.fill(this.instructionTextarea, instruction);
    }

    async getTypeText() {
        return await this.page.inputValue(this.typeInput);
    }

    async getInstructionText() {
        return await this.page.inputValue(this.instructionTextarea);
    }
    
    async createNewNodeInFlow() {
        await this.page.click(this.createNewNode)
    }


}
module.exports = WorkflowStepPage;