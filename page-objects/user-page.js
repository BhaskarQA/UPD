const { cli } = require('cypress');

require('dotenv').config();
class Userpage {
    constructor(page) {
        this.page = page

        this.userButton='//a[@href="/users"]'
        this.adduserButton='//span[contains(text(), "Add User")]'
        this.workflowViewerButton='//p[text()="Workflow Viewer"][1]'
        this.userFirstname='//input[@name="firstName"]'
        this.userLastname='//input[@name="lastName"]'
        this.userEmail='//input[@name="email"]'
        this.submitUserButton='//button[@type="submit"]'
        this.loginButton='//a[@href="/logout"]'
        this.userGet='//p[contains(text(), "AutomationTest User")]'
        this.editUserButton='//p[contains(text(), "Edit User")]'
        this.editRole="//p[contains(text(), 'Admin')]"
        this.deleteUserButton='//p[contains(text(), "Delete User")]'
    }

    async gotoUserSection(){
        await this.page.click(this.userButton)
    }
    async clickCreateUser(){
        await this.page.click(this.adduserButton)
    }
    async fillUserDetails(email){
        await this.page.click(this.workflowViewerButton)
        await this.page.fill(this.userFirstname, "AutomationTest")
        await this.page.fill(this.userLastname, "User")
        await this.page.fill(this.userEmail, email)//email
    }
    async submitUser(){
        await this.page.click(this.submitUserButton)
    }
    async checkAdminAccess(){
        const isVisible = await this.userButton.isVisible();
        return isVisible
    }

    async logout(){
        await this.page.click(this.loginButton)
    }
    async editUser(){
        await this.page.click(this.userGet)
        await this.page.click(this.editUserButton)
        await this.page.click(this.editRole)
        await this.page.click(this.submitUserButton)
    }

    async deleteUser(){
        await this.page.click(this.userGet)
        await this.page.click(this.editUserButton)
        await this.page.click(this.editRole)
        await this.page.click(this.deleteUserButton)
    }
    async loginNewUser(){
        await this.page.goto(process.env.BASE_URL);
        await this.page.waitForTimeout(5000);
        await this.page.fill();//email
        await this.page.fill();//password 
        await this.page.click(this.loginButton);  
    }

}

module.exports = Userpage;