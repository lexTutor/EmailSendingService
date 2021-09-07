const Joi = require("joi");

exports.validations = {
    // POST /api/v1/mailformat
    CreateMailFormat: {
        body: {
            //File: Joi.required(),
            ContributorName: Joi.string().required(),
        },
    },

    // PATCH /api/tasks/:taskId
    updateMailFormat: {
        body: {
            ContributorName: Joi.string().required(),
        },
    },
};