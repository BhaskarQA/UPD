Run: npx bddgen; npx playwright test --headed --reporter=html,list

npx bddgen; npx playwright test tests/feature/\*_/_.feature --headed --reporter=html,list

# Ucentrics BDD Automation Framework

This project is a BDD automation framework for testing the Ucentrics application using Playwright and Cucumber.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install dependencies:

# npm install

# npx playwright install

# Run using npm script

npm run test:login

# Or run directly with cucumber-js

npx cucumber-js --require cucumber.conf.js --require step-definitions/\*_/_.js feature/login.feature

# Run all tests, generate report, and send email

node run-tests.js

# Or use the npm script

npm run test-and-report

# Start the scheduler

node schedule-tests.js

# Keep it running with PM2 or similar tool

npm install -g pm2
pm2 start schedule-tests.js --name "test-scheduler"


