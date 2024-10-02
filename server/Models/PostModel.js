const mongoose = require('mongoose');

const MediaSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['image', 'video', 'link'], // Specify the types of media you support
        required: true,
    },
});


const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    content: {
        type: String,
        required: true,
        maxlength: 500, // Limit the length of the post content
    },
    media: {
        type: [MediaSchema], // Array of media URLs (images, videos, etc.)
        default: [],
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Users who liked the post
        },
    ],
    parentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', // Reference to the parent post, if it's a reply
        default: null,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post', // Reference to replies, which are also posts
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

postSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Post = mongoose.model("Post",postSchema);
module.exports = Post;