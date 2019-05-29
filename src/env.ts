import dotenv from "dotenv";
dotenv.config();

const development: boolean = process.env.DEVELOPMENT === "true";
const ethereal: boolean = process.env.ETHEREAL === "true";

const recipients = development ? process.env.RECIPIENTS_DEV! : process.env.RECIPIENTS_PROD!;

export default {
    ethereal,
    development,
    authGmail: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_API_PASS
    },
    authEthereal: {
        user: process.env.ETHEREAL_EMAIL,
        pass: process.env.ETHEREAL_PASS
    },
    sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL
    },
    recipients: recipients.split(",")
};
