var express = require('express');
var router = express.Router();
let { validateUserAccessToken } = require("../middlewares/authentication.mlw")
var express = require('express');
var router = express.Router();
let {
  register,
  login,
  getProfile
} = require('../controllers/auth.c')
let  {  registrationValidations,loginValidations} = require("../validations/registration.validation")
let {isValidPostMethod,isValidGetMethod} = require("../middlewares/validatemethods")

router.route('/api/register').all(isValidPostMethod).post(registrationValidations, register);
router.route('/api/login').all(isValidPostMethod).post(loginValidations, login);
router.route('/api/profile').all(isValidGetMethod).get( validateUserAccessToken,getProfile);


//Route not found error handler
router.use((req, res, next) => {
    const error = new Error('url_not_found');
    error.status = 404;
    next(error);
});


//Error handler middleware
router.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const data = err.data;
    res.status(status).send({ status: 0, message, data });
});

module.exports = router;