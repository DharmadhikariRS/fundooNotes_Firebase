

import nodemailer from "nodemailer"
import HttpStatus from 'http-status-codes';
export async function sendEmail(email,token) {
  const link=` http://localhost:3001/forgotPassword/${token}`
  const client = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rushicool112@gmail.com",
        pass:process.env.GOOGLE_APPLICATION_PASSWORD
    }
});

client.sendMail(
    {
        from: "rushicool112@gmail.com",
        to: email,
        subject: "Sending it from Herokuuuuuu",
        text: `Click here to reset ${link}`
    }
)
}