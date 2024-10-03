const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    profilePicture: {
        type: String,
        default: '', // URL of the user's profile picture
    },
    bio: {
        type: String,
        default: '',
        maxlength: 160, // Max length for bio
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Possible gender values
        default: 'other', // Default value if none is provided  
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    mutedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    profileType: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the `updatedAt` field before saving the document
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the User model   
const User = mongoose.model('User', userSchema);

module.exports = User;
