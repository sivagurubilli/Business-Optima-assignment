const Joi = require('joi');

exports.registrationValidations = async (req, res, next) => {
    try {
const schema = Joi.object({
  fullName: Joi.string().trim().required().max(50).regex(/^[a-zA-Z\s]*$/)
    .messages({
      'string.empty': 'Full Name is required',
      'string.max': 'Full Name must not exceed 50 characters',
      'string.pattern.base': 'Full Name must contain alphabetic characters only'
    }),

  emailAddress: Joi.string().trim().required().email()
    .messages({
      'string.empty': 'Email Address is required',
      'string.email': 'Invalid email format'
    }),

  password: Joi.string().trim().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter and one digit'
    }),

  confirmPassword: Joi.string().trim().required().valid(Joi.ref('password'))
    .messages({
      'string.empty': 'Confirm Password is required',
      'any.only': 'Passwords do not match'
    }),

  dateOfBirth: Joi.date().required()
    .messages({
      'date.base': 'Date of Birth must be a valid date',
      'any.required': 'Date of Birth is required'
    }),

  phoneNumber: Joi.string().trim().required().regex(/^\d{10}$/)
    .messages({
      'string.empty': 'Phone Number is required',
      'string.pattern.base': 'Phone Number must be a valid phone number format with 10 digits'
    }),

  address: Joi.string().trim().required().max(100)
    .messages({
      'string.empty': 'Address is required',
      'string.max': 'Address must not exceed 100 characters'
    }),

  city: Joi.string().trim().required().max(50).regex(/^[a-zA-Z\s]*$/)
    .messages({
      'string.empty': 'City is required',
      'string.max': 'City must not exceed 50 characters',
      'string.pattern.base': 'City must contain alphabetic characters only'
    }),

  state: Joi.string().trim().required().max(50).regex(/^[a-zA-Z\s]*$/)
    .messages({
      'string.empty': 'State is required',
      'string.pattern.base': 'State must contain alphabetic characters only'
    }),

  zipCode: Joi.string().trim().required().length(6).regex(/^\d{6}$/)
    .messages({
      'string.empty': 'Zip Code is required',
      'string.length': 'Zip Code must be 6 characters long',
      'string.pattern.base': 'Zip Code must be a 6 digit number'
    }),

  country: Joi.string().trim().required().max(50).regex(/^[a-zA-Z\s]*$/)
    .messages({
      'string.empty': 'Country is required',
      'string.pattern.base': 'Country must contain alphabetic characters only'
    }),

  securityQuestion: Joi.string().trim().required().max(100)
    .messages({
      'string.empty': 'Security Question is required',
    }),

  securityAnswer: Joi.string().trim().required().max(100)
    .messages({
      'string.empty': 'Security Answer is required',
      'string.max': 'Security Answer must not exceed 100 characters'
    })

});
let { error } = schema.validate(req.body);
        if (error) {
            let message = error.details[0].message;
            throw { status: 400, message: message || "Payload request error" }
        }
        else next();
    } catch (error) {
        next(error)
    }

}


exports.loginValidations = async (req, res, next) => {
    try {
const schema = Joi.object({
  
  emailAddress: Joi.string().trim().required().email()
    .messages({
      'string.empty': 'Email Address is required',
      'string.email': 'Invalid email format'
    }),

  password: Joi.string().trim().required().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter and one digit'
    }),
})
let { error } = schema.validate(req.body);
        if (error) {
            let message = error.details[0].message;
            throw { status: 400, message: message || "Payload request error" }
        }
        else next();
    } catch (error) {
        next(error)
    }

}