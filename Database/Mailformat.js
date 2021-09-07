const mongoose = require("mongoose");

const MailFormat = mongoose.model("MailFormat", {
    ContributorName: {
        type: String,
        required: true,
        trim: true,
    },
    ImageUrl: {
        type: String,
        required: true,
        validate(value) {
            let url;
            url = new URL(value);
            if (
                url.protocol.toLowerCase() !== "http:" &&
                url.protocol.toLowerCase() !== "https:"
            ) {
                throw new Error("Invalid URL");
            }
        },
    }
});

module.exports = MailFormat;