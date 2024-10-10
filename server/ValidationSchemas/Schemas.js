const Joi = require('joi');

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
    DeletePost:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(), // Validate postId in the params
        }),
    },
    UpdatePost:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(), // Validate postId in the params
        }),
        body: Joi.object({
            content: Joi.string().max(500).required(),
            media: Joi.array().items({
                url: Joi.string().uri().required(),
                type: Joi.string().valid('image', 'video', 'link').required(),
            }).optional(),
        }),
    },
    AddComment:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(), // Validate postId in the params
        }),
        body: Joi.object({
            content: Joi.string().max(500).required(),
            media: Joi.array().items({
                url: Joi.string().uri().required(),
                type: Joi.string().valid('image', 'video', 'link').required(),
            }).optional(),
        }),
    },
    getComments:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(),
        }),
    },
    getLikes:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(),
        }),
    },
    getFullPost:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(),
        }),
    },
    LikePost:{
        params: Joi.object({
            postId: Joi.string().hex().length(24).required(),
        }),
    },
    followUser:{
        params: Joi.object({
            memberId: Joi.string().hex().length(24).required(),
        }),
    },
    getFollowers:{
        params: Joi.object({
            userId: Joi.string().hex().length(24).required(),
        }),
    },
    getFollowing:{
        params: Joi.object({
            userId: Joi.string().hex().length(24).required(),
        }),
    },
    privacy:{
        body: Joi.object({
            profileType: Joi.string().valid('public','private').required(),
        }),
    },
    feed:{
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().max(50).optional(),
        }),
    },
    explore:{
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().max(50).optional(),
        }),
    },
};
module.exports = schemas;