const Joi = require("joi");

exports.validations = {
    // POST /api/v1/mailformat
    SendMail: {
        body: {
            to: Joi.string().required(),
            from: Joi.string().required(),
            apiKey: Joi.string()
                .required()
                .regex(/^SG.*$/),
            header: Joi.string().required(),
            body: Joi.string().required(),
            subject: Joi.string().required(),
            mailFormatId: Joi.string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required(),
        },
    },
};