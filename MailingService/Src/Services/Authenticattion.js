const User = require("../Database/User");
const Token = require("jsonwebtoken");

exports.Login = (UserLoginRequest) => {
    return new Promise(async(resolve, reject) => {
        await User.findOne({
                userName: UserLoginRequest.userName,
                password: UserLoginRequest.password,
            })
            .then((user) => {
                const token = Token.sign({
                        userName: user.userName,
                        Id: user._id,
                    },
                    process.env.JWT_SECRET_KEY, {
                        expiresIn: "10min",
                        issuer: process.env.JWT_ISSUER,
                    }
                );

                return resolve({ token: token, successful: true, error: null });
            })
            .catch((err) => {
                return reject({
                    token: null,
                    successful: false,
                    error: "Resource does not exist",
                });
            });
    });
};

exports.Update = (updateParams, userId) => {
    const updates = Object.keys(updateParams);
    const allowedUpdates = ["userName", "password"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        throw new Error("Only UserName and Password fields can be updated");
    }

    return new Promise(async(resolve, reject) => {
        let user = await User.findByIdAndUpdate(userId, updateParams, {
            new: true,
            runValidators: true,
        });
        if (user === null) {
            return reject("Resource does not exist");
        }
        return resolve();
    });
};