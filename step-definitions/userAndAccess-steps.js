const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const UserPage = require('../page-objects/user-page');
const LoginPage = require('../page-objects/login-page');




Given('I navigate to the user section and click create user', async function () {
  this.userPage = new UserPage(this.page);
  await this.userPage.gotoUserSection();
  await this.userPage.clickCreateUser();
});

When('I create an user without admin access', async function () {
  this.userPage = new UserPage(this.page);
  await this.userPage.fillUserDetails();
  await this.userPage.submitUser(email);
});

Then('I login in with the user and check the user has the admin access', async function () {
  this.userPage = new UserPage(this.page);
  await this.userPage.logout();
  await this.userPage.login('newuser@email.com', 'userPassword');
  const access= await this.userPage.checkAdminAccess();
  expect(access).toBe(false)
});

Given('I login as an admin user', async function () {
  this.userPage = new UserPage(this.page);
  this.loginPage=new LoginPage(this.page)
  await this.userPage.logout();
  await this.loginPage.loginAdmin();
});

When('I edit the user and give them the admin access', async function () {
  this.userPage = new UserPage(this.page);
  await this.userPage.editUser(email);
});

Then('I check the admin access for the added user', async function () {
  this.userPage = new UserPage(this.page);
  this.loginPage=new LoginPage(this.page)
  await this.loginPage.logout();
  await this.loginPage.loginNewUser('newuser@email.com', 'userPassword');
  const access= await this.userPage.checkAdminAccess();
  expect(access).toBe(false)
});

When('I delete the added user', async function () {
  this.userPage = new UserPage(this.page);
  await this.userPage.deleteUser();
});

Then('I check the added email has the access to view the page', async function () {
  this.userPage = new UserPage(this.page);
  this.loginPage=new LoginPage(this.page)
  await this.userPage.logout();
  await this.userPage.loginNewUser('newuser@email.com', 'userPassword');
  //need to be implemented 
});
