// models/otpModel.js
const mongoose = require('mongoose');
const mailSender = require('../helpers/mailSender')

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  was_used: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verificación OTP",
      `<h1>Por favor confirma el OTP enviado</h1>
       <p>Código OTP: ${otp}</p>`
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}
otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});
module.exports = mongoose.model("OTP", otpSchema);