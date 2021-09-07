const express = require("express");
const MailFormat = require("../Database/Mailformat");
const router = new express.Router();
const authorization = require("../MiddleWare/Authorization");
const mailFormat = require("../Services/MailFormat");
const multer = require("multer");
const validate = require("express-validation");
const validation = require("../Routers/Validation/MailFormat");
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post(
    "/MailFormat",
    authorization,
    upload.single("File"),
    validate(validation.validations.CreateMailFormat),
    async(request, response) => {
        await mailFormat
            .AddFormat(request.file, request.body.ContributorName)
            .then((res) => {
                return response.status(201).send(res);
            })
            .catch((err) => {
                return response.status(400).send(err.message);
            });
    }
);

router.get("/MailFormat", async(request, response) => {
    await mailFormat
        .getAll()
        .then((result) => {
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
});

router.get("/MailFormat/:id", async(request, response) => {
    await mailFormat
        .getById(request.params.id)
        .then((result) => {
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
});

router.delete("/MailFormat/:id", authorization, async(request, response) => {
    await mailFormat
        .delete(request.params.id)
        .then((result) => {
            return response.status(200).send(result);
        })
        .catch((error) => {
            return response.status(400).send(error);
        });
});

router.patch(
    "/MailFormat/:id",
    authorization,
    validate(validation.validations.updateMailFormat),
    async(request, response) => {
        await mailFormat
            .Update(request.body, request.params.id)
            .then(() => {
                return response.status(204).send();
            })
            .catch(() => {
                return response.status(400).send();
            });
    }
);
module.exports = router;