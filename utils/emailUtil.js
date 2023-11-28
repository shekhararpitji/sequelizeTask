const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_KEY,
  },
});

exports.registrationMail = async (userMail) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: userMail,
      subject: "registration",
      text: "registration completed",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};

exports.passwordResetMail = async (userMail, resetLink) => {
  const info = await transporter.sendMail({
    to: userMail,
    from: process.env.EMAIL,
    subject: "Password Reset",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  });
  console.log("Message sent: %s", info.messageId);
};

exports.passwordResetSuccessMail = async (userEmail) => {
  const info = await transporter.sendMail({
    to: userEmail,
    from: process.env.EMAIL,
    subject: "Password Reset Successful",
    html: "<p>Your password has been successfully reset.</p>",
  });
  console.log("Message sent: %s", info.messageId);
};
