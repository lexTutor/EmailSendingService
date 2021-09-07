const mongoose = require("mongoose");

const User = mongoose.model("User", {
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            let regex = new RegExp(
                "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
            );
            if (!regex.test(value)) {
                throw new Error("Password is too weak");
            }
        },
    },
});
module.exports = User;