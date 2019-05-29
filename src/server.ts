import nodemailer from "nodemailer";
import request from "request-promise-native";
import env from "./env";

import mjml2html from "mjml";

import loadMjml from "./loadMjml";

const main = async () => {
    /**
     * 587/2525/25 - Non-secure
     * 465 - SSL
     */
    const etherealSettings = {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: env.authEthereal
    };

    const gmailSettings = {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: env.authGmail
    };

    const transporter = nodemailer.createTransport(env.ethereal ? etherealSettings : gmailSettings);

    const EMAIL_COUNT: number = 1;
    const sender = env.sender;
    const recipients: string[] = env.recipients;

    const mjmlOptions: any = {
        keepComments: false,
        beautify: false,
        minify: true,
        validationLevel: "soft"
    };

    const mjmlContent = loadMjml("cat-fact");

    for (let i = 0; i < EMAIL_COUNT; i++) {
        setTimeout(async () => {
            try {
                const res = await request("https://catfact.ninja/fact");
                const resultJson = JSON.parse(res);
                const mjmlOutput = mjml2html(mjmlContent.replace("%CAT_FACT%", resultJson.fact), mjmlOptions);

                const info = await transporter.sendMail({
                    from: `"${sender.name}" <${sender.email}>`,
                    to: recipients,
                    subject: "CAT FACTS",
                    html: mjmlOutput.html
                });

                console.log("Message sent: %s", info.messageId);
                if (env.ethereal) {
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                }
            } catch (err) {
                console.log(err);
            }
        }, 1000);
    }
};

try {
    main();
} catch (err) {
    console.log(err);
}
