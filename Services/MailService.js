const sendGrid = require("@sendgrid/mail");
const fileStream = require("fs");
require("path");
const path = require("path");
exports.SendMail = async(mail) => {
    try {
        sendGrid.setApiKey(mail.apiKey);
        return new Promise(async(resolve, reject) => {
            sendGrid
                .send({
                    to: mail.to,
                    from: mail.from,
                    subject: mail.subject,
                    content: [{
                        type: "text/html",
                        value: await getMailBody(
                            mail.header,
                            mail.body,
                            mail.mailFormatId
                        ).catch(() => {
                            reject(`No mailformat with the Id ${mail.mailFormatId} exists`);
                        }),
                    }, ],
                })
                .then(() => {
                    return resolve(`Mail successfully Sent to ${mail.to}`);
                })
                .catch((error) => {
                    switch (error.message) {
                        case "Unauthorized":
                            return reject(
                                "Your APIKey is either invalid, expired or has been revoked"
                            );
                        case "Forbidden":
                            return reject(
                                "There is a lack of uniformity between the apikey and the sender email."
                            );

                        default:
                            return reject(error);
                    }
                });
        });
    } catch (error) {
        throw new Error(error);
    }
};

const getMailBody = (header, body, mailforamtId) => {
    let filePath = path.join(
        process.env.MAIL_FORMAT_PATH,
        mailforamtId + ".html"
    );
    return new Promise(async(resolve, reject) => {
        fileStream.readFile(filePath, { encoding: "utf-8" }, (error, result) => {
            if (!error) {
                return resolve(
                    result
                    .replace(process.env.HEADER, header)
                    .replace(process.env.BODY, body)
                );
            }
            return reject(error);
        });
    });
};