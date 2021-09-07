const express = require("express");
const User = require("../Database/User");
const router = new express.Router();
const authorization = require("../MiddleWare/Authorization");
const auth = require("../Services/Authenticattion");
const validate = require("express-validation");
const validation = require("../Routers/Validation/User");

router.post(
    "/User",
    validate(validation.validation.Login),
    async(request, response) => {
        await auth
            .Login(request.body)
            .then((token) => {
                return response.status(200).send(token);
            })
            .catch((error) => {
                return response.status(400).send(error);
            });
    }
);

router.patch(
    "/User",
    authorization,
    validate(validation.validation.updateUser),
    async(request, response) => {
        await auth
            .Update(request.body, request.userData.Id)
            .then(() => {
                return response.status(204).send();
            })
            .catch((error) => {
                return response.status(400).send(error);
            });
    }
);
module.exports = router;