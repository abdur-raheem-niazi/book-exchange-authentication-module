const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send approval email
const sendApprovalEmail = async (user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Account Approved - Book Exchange Platform',
            html: `
                <h1>Account Approved</h1>
                <p>Hello ${user.first_name} ${user.last_name},</p>
                <p>Your account on the Book Exchange Platform has been approved by the admin.</p>
                <p>You can now log in using your username and password.</p>
                <p>Thank you for joining our platform!</p>
                <p>Best regards,<br>Book Exchange Platform Team</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error.message);
        return false;
    }
};

module.exports = {
    sendApprovalEmail
}; 