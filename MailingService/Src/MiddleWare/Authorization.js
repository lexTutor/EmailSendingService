const Jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
    try {
        let token = request.headers.authorization.split(" ")[1];
        request.userData = Jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        return response.status(401).send();
    }
};