const express = require("express");
require("dotenv").config();
require("./Database/Mongoosedb");
const mailFormatRouters = require("./Routers/MailFormatRouter");
const userRouters = require("./Routers/UserRouter");
const mailRouters = require("./Routers/MailRouter");
const expressValidation = require("express-validation");
const port = process.env.PORT;
const app = express();

//Helps parse the incoming json data
app.use(express.json());

app.use(mailFormatRouters);
app.use(userRouters);
app.use(mailRouters);

app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        res
            .status(err.status)
            .json({ Erros: err.errors, Status: err.status, Message: err.message });
    }
});

app.listen(port, () => {
    console.log("Server is starting on port " + port);
});