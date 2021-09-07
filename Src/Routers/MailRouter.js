const express = require("express");
const router = new express.Router();
const mail = require("../Services/MailService");
const validate = require("express-validation");
const validation = require("../Routers/Validation/Mail");
router.post(
    "/Mail",
    validate(validation.validations.SendMail),
    async(request, response) => {
        mail
            .SendMail(request.body)
            .then((result) => {
                return response
                    .status(200)
                    .send({ Error: null, Result: result, success: true });
            })
            .catch((error) => {
                return response
                    .status(400)
                    .send({ Errors: error, Result: "Failed", success: false });
            });
    }
);

module.exports = router;