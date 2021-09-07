const cloudinary = require("cloudinary").v2;
require("dotenv").config();
let streamifier = require("streamifier");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

exports.upload = (file) => {
    return new Promise((resolve, reject) => {
        let extension = file.originalname.split(".").pop();
        let validExtensions = ["jpg", "jpeg", "png"];
        console.log(extension);
        console.log(validExtensions);
        console.log(validExtensions.includes(extension));
        if (validExtensions.includes(extension) === false) {
            throw new Error("File format not supported");
        }
        const stream = streamifier.createReadStream(file.buffer);
        stream.pipe(
            cloudinary.uploader.upload_stream((error, result) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                return resolve(result);
            })
        );
    });
};

exports.New = () => {};