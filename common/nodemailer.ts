import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 
  
  async sendOTPEmail(to: string, otp: string , actionType:string) {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .email-container {
          font-family: Arial, sans-serif;
          color: #333;
          background-color: #f9f9f9;
          padding: 20px;
          max-width: 600px;
          margin: auto;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .logo {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo img {
          max-width: 150px;
        }
        .content {
          text-align: center;
          line-height: 1.6;
        }
        .otp-code {
          display: inline-block;
          margin: 20px auto;
          padding: 10px 20px;
          color: #007BFF;
          background-color: #e9f5ff;
          font-size: 24px;
          font-weight: bold;
          border-radius: 5px;
          border: 1px solid #007BFF;
        }
        .copy-button {
          margin-top: 20px;
          padding: 10px 20px;
          color: #fff;
          background-color: #007BFF;
          font-size: 16px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
  <div class="email-container">
    <div class="content">
      <h2>Your OTP Code</h2>
      <p>We received a request to ${actionType}. Use the OTP code below to proceed:</p>
      <div>
        <div class="otp-code">${otp}</div>
      </div>
      <p>This OTP code is valid for 5 minutes.</p>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
    </div>
  </div>
</body>
    </html>
    `;
      
        await this.transporter.sendMail({
          from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
          to,
          subject: actionType,
          html: htmlContent,
        });
      }
    
}




// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class MailService {
//   private transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   async sendPasswordResetEmail(to: string, resetLink: string) {
//     const htmlContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <style>
//           .email-container {
//             font-family: Arial, sans-serif;
//             color: #333;
//             background-color: #f9f9f9;
//             padding: 20px;
//             max-width: 600px;
//             margin: auto;
//             border-radius: 10px;
//             box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
//           }
//           .logo {
//             text-align: center;
//             margin-bottom: 20px;
//           }
//           .logo img {
//             max-width: 150px;
//           }
//           .content {
//             text-align: center;
//             line-height: 1.6;
//           }
//           .reset-button {
//             display: inline-block;
//             margin: 20px auto;
//             padding: 10px 20px;
//             color: white;
//             background-color: #007BFF;
//             text-decoration: none;
//             font-size: 16px;
//             border-radius: 5px;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 20px;
//             font-size: 12px;
//             color: #888;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="email-container">
//           <div class="logo">
//             <img src="https://your-project-logo-url.com/logo.png" alt="Project Logo" />
//           </div>
//           <div class="content">
//             <h2>Reset Your Password</h2>
//             <p>We received a request to reset your password. Click the button below to proceed:</p>
//             <a href="${resetLink}" class="reset-button">Reset Password</a>
//             <p>If you didn’t request this, please ignore this email.</p>
//           </div>
//           <div class="footer">
//             <p>&copy; ${new Date().getFullYear()} Your Project Name. All rights reserved.</p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `;
  
//     await this.transporter.sendMail({
//       from: `"${process.env.PROJECT_NAME}" <${process.env.EMAIL_USER}>`,
//       to,
//       subject: 'Reset Your Password',
//       html: htmlContent,
//     });
//   }
// }

