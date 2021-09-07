const Joi = require("joi");

exports.validation = {
    // POST /api/v1/user
    Login: {
        body: {
            userName: Joi.string().required(),
            password: Joi.string().required(),
        },
    },

    // PATCH /api/tasks/:Id
    updateUser: {
        body: {
            userName: Joi.string(),
            password: Joi.string(),
        },
    },
};