const MailFormat = require("../Database/Mailformat");
const cloud = require("../Services/Cloudinary");

exports.AddFormat = (file, name) => {
    return new Promise((resolve, reject) => {
        cloud
            .upload(file)
            .then(async(res) => {
                const mailFormat = new MailFormat({
                    ContributorName: name,
                    ImageUrl: res.secure_url,
                });

                try {
                    await mailFormat.save();
                    return resolve(mailFormat);
                } catch (error) {
                    return reject(error);
                }
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

exports.Update = async(updateParams, Id) => {
    return new Promise(async(resolve, reject) => {
        const updates = Object.keys(updateParams);
        const allowedUpdates = ["ContributorName"];
        const isValidOperation = updates.every((update) =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) {
            return reject("Only the ContributorName field can be updated");
        }

        await MailFormat.findByIdAndUpdate(Id, updateParams, {
                new: true,
                runValidators: true,
            })
            .then(() => {
                return resolve();
            })
            .catch(() => {
                return reject();
            });
    });
};

exports.getById = (Id) => {
    return new Promise(async(resolve, reject) => {
        await MailFormat.findById(Id, { _id: 1, __v: 0 })
            .then((res) => {
                if (res === null) {
                    return reject("Resource does not exist");
                }
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

exports.getAll = () => {
    return new Promise(async(resolve, reject) => {
        await MailFormat.find({}, { _id: 1, __v: 0 })
            .then((res) => {
                if (res === null) {
                    return reject("Resource does not exist");
                }
                return resolve(res);
            })
            .catch(() => {
                return reject("An error occured");
            });
    });
};

exports.delete = (Id) => {
    return new Promise(async(resolve, reject) => {
        await MailFormat.findByIdAndDelete(Id, { _id: 1, __v: 0 })
            .then((res) => {
                if (res === null) {
                    return reject("Resource does not exist");
                }
                return resolve(res);
            })
            .catch((err) => {
                return reject(err);
            });
    });
};