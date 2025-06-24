const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateReport, reportName } = require('./report-generator');
const moment = require('moment');
require('dotenv').config();

async function sendReportEmail() {
    // Generate the report first
    const reportPath = generateReport();

    if (!reportPath) {
        console.error('Failed to generate report. Email not sent.');
        return;
    }

    // Get test results summary
    const jsonReportPath = path.join(__dirname, '../reports/cucumber_report.json');
    let testResults;
    try {
        const jsonReport = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));

        // Calculate summary statistics
        let totalScenarios = 0;
        let passedScenarios = 0;
        let failedScenarios = 0;

        jsonReport.forEach(feature => {
            feature.elements.forEach(scenario => {
                totalScenarios++;

                // Check if any step failed
                const hasFailed = scenario.steps.some(step => step.result.status === 'failed');
                if (hasFailed) {
                    failedScenarios++;
                } else {
                    passedScenarios++;
                }
            });
        });

        testResults = {
            totalScenarios,
            passedScenarios,
            failedScenarios,
            passRate: Math.round((passedScenarios / totalScenarios) * 100)
        };
    } catch (error) {
        console.error('Error parsing test results:', error);
        testResults = { error: 'Could not parse test results' };
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Get recipients from environment variable
    const recipients = process.env.EMAIL_RECIPIENTS.split(',').map(email => email.trim());

    // Create email content
    const emailSubject = `Web Test Automation Report - ${moment().format('YYYY-MM-DD')} - Pass Rate: ${testResults.passRate || 'N/A'}%`;

    const emailHtml = `
    <h2>Ucentrics Web Test Automation Report</h2>
    <p>Please find attached the latest web test automation report.</p>
    
    <h3>Summary:</h3>
    <ul>
      <li><strong>Platform:</strong> Web</li>
      <li><strong>Total Scenarios:</strong> ${testResults.totalScenarios || 'N/A'}</li>
      <li><strong>Passed Scenarios:</strong> ${testResults.passedScenarios || 'N/A'}</li>
      <li><strong>Failed Scenarios:</strong> ${testResults.failedScenarios || 'N/A'}</li>
      <li><strong>Pass Rate:</strong> ${testResults.passRate || 'N/A'}%</li>
      <li><strong>Environment:</strong> QA</li>
      <li><strong>Execution Date:</strong> ${moment().format('YYYY-MM-DD HH:mm:ss')}</li>
    </ul>
    
    <p>For detailed results, please see the attached HTML report.</p>
    
    <p>This is an automated email. Please do not reply.</p>
  `;

    // Send email with attachment
    try {
        const info = await transporter.sendMail({
            from: `"Web Test Automation" <${process.env.EMAIL_USER}>`,
            to: recipients.join(', '),
            subject: emailSubject,
            html: emailHtml,
            attachments: [
                {
                    filename: `${reportName}.html`,
                    path: reportPath
                }
            ]
        });

        console.log('Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Recipients:', recipients);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// If this script is run directly (not imported)
if (require.main === module) {
    sendReportEmail().catch(console.error);
}

module.exports = { sendReportEmail };