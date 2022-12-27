import nodemailer from "nodemailer";

export const sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: to,
    subject: "Your Password Reset Link",
    html: `<p>If you need to reset your password, click <a href="${resetLink}">here</a>.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};
