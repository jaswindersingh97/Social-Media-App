const Joi = require('joi');
const { param } = require('../Endpoints/SecureRoutes');

const schemas = {    
    register: {
        body: Joi.object({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            gender: Joi.string().valid('male', 'female', 'non-binary', 'other').default('other'),
        }),
    },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
        }),
    },
    updatePassword: {
        body: Joi.object({
            password: Joi.string().min(6).required(), 
        }),
    },
    updateUser: {
        body: Joi.object({
            username: Joi.string().min(3).max(20).required(),
            email: Joi.string().email().required(),
            profilePicture: Joi.string().uri().required(),
            bio: Joi.string().max(160).required(),
            gender: Joi.string().valid("male", "female", "non-binary", "other").required()
        }),
    },
    getUser:{
        params: Joi.object({
            userId: Joi.string().hex().length(24).required(), // Validate userId in the params
        }),
    },
    CreatePost: {
        body: Joi.object({
            content: Joi.string().max(500).required(),
            media: Joi.array().items({
                url: Joi.string().uri().required(),
                type: Joi.string().valid('image', 'video', 'link').required(),
            }).optional(),
        })
    },
    getPost:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(),
        }),
    },
    getPostsByUserId:{
        params: Joi.object({
            userId: Joi.string().hex().length(24).required(), // Validate userId in the params
        }),
    },
};
module.exports = schemas;