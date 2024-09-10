const jwt = require('jsonwebtoken')
let { privateKey} = require('../config/config')
let  User = require('../models/user.m')


exports.generateAccessToken = (data) => {
    let token = jwt.sign({ id: data._id }, privateKey, { expiresIn: 60 * 5 }); // 5 minutes in seconds
    let expiryTime = new Date(Date.now() + 60 * 5 * 1000); // Calculate expiry time, 5 minutes from now

    return { token, expiryTime };
}



//Verification setup for the provided token of User
exports.validateUserAccessToken = async (req, res, next) => {

    try {
        let decoded;
        let role;
        let token = req.headers["access-token"];
        if (!token) throw { status: 499, message: "Token missing in headers" }

        jwt.verify(token, privateKey, (err, decodedData) => {
            if (err) {
                if (err.name === 'TokenExpiredError') throw { status: 401, message: "Unauthorized user" }
                else throw { status: 498, message: "Invalid token" }
            } else decoded = decodedData;
        });

        //Finding the user in All collections
        let user = await User.findOne({ _id: decoded.id, status: { $nin: [0] }, isDeleted: false })
        if (!user) throw { status: 401, message: "Unauthorized user" }
        user = JSON.parse(JSON.stringify(user));
        req.user = user;
        next();
    }
    catch (e) {
        res.status(e.status || 500).send({ status: 0, message: e.message || "Internal server error" })
    }
};