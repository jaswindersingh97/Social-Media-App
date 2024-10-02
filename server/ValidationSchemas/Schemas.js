const Joi = require('joi');

const schemas = {
    register: Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        gender: Joi.string().valid('male', 'female', 'non-binary', 'other').default('other'),
    }),
    login: Joi.object({
        email: Joi.string().email(),
        password: Joi.string().min(6), 
    }),
    UpdatePassword: Joi.object({
        password: Joi.string().min(6), 
    }),
    updateUser: Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        profilePicture: Joi.string().required(),
        bio: Joi.string().max(160).required(),
        gender: Joi.string().valid("male","female","other").required()
    }),
};
module.exports = schemas;