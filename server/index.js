// index.js
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Gemini API setup
const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Gemini API Key is not set. Please set GEMINI_API_KEY in your .env file.");
}
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
});

// Portfolio data (moved from frontend for security)
const portfolioData = {
  name: "Fekremariam Engida",
  role: "Data analytics and Full Stack Developer",
  
  bio: "a versatile Data Analyst and a passionate developer creating impactful Web and Mobile applications. and Dive in to explore how I transform data into insights and ideas into intuitive digital experiences.",
  projects: [
    {
      title: "Data Visualization Dashboard",
      type: "Data Analysis Dashboard",
      description: "A real-time dashboard displaying overall bank performance metrics like revenue, deposits, loans, and branch analytics for better decision-making.",
      technologies: ["SQL", "Seal Report Designer","Razor script"],
    },
    {
      title: "Ministry of Health OTC",
      type: "Web Application",
      description: "A full-stack centralized web platform for Ethiopia's Ministry of Health (MOH) designed to monitor, manage, and report cash collections and payment transactions across diverse healthcare service points.",
      technologies: ["React", "Csharp", "NodeJs", "HTML"],
    },
    {
      title: "Android Healthcare System",
      type: "Mobile Application",
      description: "An interactive platform that improves doctor-patient communication through real-time messaging, appointment booking, and secure medical info sharing",
      technologies: ["Java", "XML"],
    },
    {
      title: "Tesla Stock Price Prediction",
      type: "Machine Learning",
      description: "This project uses historical Tesla stock data to build a machine learning model that predicts future closing prices. It includes data cleaning, visualization, feature engineering, and regression modeling to forecast trends in TSLA stock.",
      technologies: ["python", "jupyter notebook","google Colab"],
    },
    {
      title: "Portfolio Website",
      type: "Web Application",
      description: "My personal portfolio website, designed to showcase my skills and projects. Built with React and styled with Tailwind CSS.",
      technologies: ["React", "Tailwind CSS"],
    },
  ],
  skills: ["Python","JavaScript", "React", "Node.js","Java" ,"Kotlin","Express", "MongoDB", "SQL", "Git","PowerBI", "Seal Report Designer","XML","Csharp"],
  contact : [
  {
    method: "Email",
    details: "fekirengida@gmail.com"
  },
  {
    method: "LinkedIn",
    details: "https://www.linkedin.com/in/fekremariam-engida/"
  },
  {
    method: "GitHub",
    details: "https://github.com/FekremariamE"
  }
<<<<<<< HEAD
]
=======
],
>>>>>>> 8be1471fd8f17305e64a1ac45db6b957d59cf934
};

// Function to create portfolio prompt
const createPortfolioPrompt = () => {
  const { name, role, bio, projects, skills, contact } = portfolioData;

  let prompt = `You are an AI assistant designed to answer questions about ${name}, a ${role}. Your responses should be helpful, friendly, and professional. You should only use the provided information to answer questions.`;

  prompt += `\n\nHere is some information about me:\n`;
  prompt += `- **Bio:** ${bio}\n`;
  prompt += `- **Skills:** ${skills.join(", ")}\n`;
<<<<<<< HEAD
   prompt += `- **Contact:** \n`;
  contact.forEach((item) => {
  prompt += `• ${item.method}: ${item.details}\n`;
=======
   
 prompt = `### Contact Information\n`;

contact.forEach((item) => {
  // Clean up URL formatting to look sharper for the user
  let displayDetails = item.details
    .replace(/^https?:\/\/(www\.)?/, '') // Removes http://, https://, and www.
    .replace(/\/$/, '');                 // Removes trailing slashes

  prompt += `* **${item.method}:** ${displayDetails}\n`;
>>>>>>> 8be1471fd8f17305e64a1ac45db6b957d59cf934
});
    
  prompt += `- **Projects:**\n`;
  projects.forEach((proj, index) => {
    prompt += `  ${index + 1}. **${proj.title}** (${proj.type}): ${proj.description}\n`;
    prompt += `     - Technologies: ${proj.technologies.join(", ")}\n`;
  });

  return prompt;
};

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const promptWithContext = `${createPortfolioPrompt()}\n\nUser Question: ${message}`;
    
    const result = await model.generateContent(promptWithContext);

    const botReplyText = result.response.text();
    res.json({ reply: botReplyText });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// --- IMPORTANT: UPDATE THESE VALUES ---

const transporter = nodemailer.createTransport({
  service: 'gmail', // This is usually fine for Gmail
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_EMAIL_PASSWORD
  },
  //  tls: {
  //   // This is the line that bypasses the certificate validation
  //   rejectUnauthorized: false 
  // }
});

// POST route to send email to you when user submits form
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

let recipients = [];

  // ✅ Example logic: choose recipients based
  

    recipients = [
<<<<<<< HEAD
      'fekremariamen@gmail.com'
=======
  'fekremariamen@gmail.com'
>>>>>>> 8be1471fd8f17305e64a1ac45db6b957d59cf934
    ];
  
  
  console.log("the recipent ",recipients)
 

 const mailOptions = {
  from: process.env.ADMIN_EMAIL,
  to: recipients,
  subject: `New Inquiry from Portfolio: ${name}`,
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Prevents Apple Mail from formatting links automatically -->
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <title>New Contact Message</title>
    <style>
      /* Reset styles for email clients */
      body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
      
      /* Base styles */
      body {
        margin: 0;
        padding: 0;
        width: 100% !important;
        background-color: #f3f4f6;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }

      /* Hover effects don't work inline, so they stay in the style tag */
      .email-link { color: #2563eb !important; text-decoration: none !important; }
      .email-link:hover { text-decoration: underline !important; }
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f3f4f6; padding-top: 40px; padding-bottom: 40px;">
    
    <!-- Hidden Preheader Text for Inbox Preview -->
    <div style="display: none; max-height: 0px; overflow: hidden; font-size: 0px; line-height: 0px; color: #f3f4f6;">
      You have received a new message from ${name} via your portfolio website.
    </div>

    <!-- Main Container Table -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6;">
      <tr>
        <td align="center">
          
          <!-- Content Table -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #1f2937; padding: 32px 20px;">
                <h1 style="color: #ffffff; font-size: 24px; font-weight: 600; margin: 0; letter-spacing: -0.5px;">New Inquiry Received</h1>
                <p style="color: #9ca3af; font-size: 14px; margin: 8px 0 0 0;">Personal Portfolio Contact Form</p>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 40px 32px;">
                
                <!-- Contact Details -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                  <tr>
                    <td style="padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
                      <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Sender Name</span>
                      <span style="font-size: 16px; color: #111827; font-weight: 500;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e7eb;">
                      <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Email Address</span>
                      <a href="mailto:${email}" class="email-link" style="font-size: 16px; color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
                    </td>
                  </tr>
                </table>

                <!-- Message Box -->
                <span style="display: block; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; font-weight: 600; margin-bottom: 8px;">Message</span>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td style="background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; border-radius: 0 8px 8px 0;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #374151; white-space: pre-line;">${message}</p>
                    </td>
                  </tr>
                </table>
                
                <!-- Call to Action (Optional Reply Button) -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
                  <tr>
                    <td align="center">
                      <a href="mailto:${email}" style="background-color: #2563eb; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">Reply to ${name}</a>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f9fafb; padding: 24px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  This is an automated message generated from your personal website.<br>
                  © ${new Date().getFullYear()} Your Portfolio.
                </p>
              </td>
            </tr>

          </table>
          
        </td>
      </tr>
    </table>

  </body>
  </html>
  `
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent to admin.');
    res.status(200).json({ success: true, message: 'Your message has been sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});
app.get("/", (req, res) => {
  res.send("Backend is running");
});
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
