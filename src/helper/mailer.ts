import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs";
import User from "../models/user.model";

export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        if (!email || !emailType || !userId) {
            throw new Error("Email, EmailTypr and userId is required");
        }
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findOneAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }, { new: true })

        } else if (emailType === "RESET") {
            await User.findOneAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            }, { new: true })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "df347a83890910",
                pass: "125eef03a61f35"
            }
        });

        const mailOptions = {
            from: "rohit@gmail.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your Password"} or copy the link below <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}