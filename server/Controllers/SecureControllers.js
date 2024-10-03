const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");
const bcrypt = require('bcrypt');
// Fetch user profile
const profile = async (req, res) => {
    try {
        const { userId } = req.user;
        const response = await User.findOne({ _id: userId });
        if (!response) {
            return res.status(400).json({ error: "No user found" });
        }
        res.status(200).json({ message: "User fetched successfully", response });
    } catch (error) {
        console.error("Fetching error:", error);
        return res.status(500).json({ error: "Server error while fetching profile" });
    }
};

// Update user profile
const updateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { username, email, profilePicture, bio, gender } = req.body;

        const response = await User.findByIdAndUpdate(
            userId,
            {
                username,
                email,
                profilePicture,
                bio,
                gender,
                updatedAt: Date.now(),
            },
            { new: true } // Return updated document
        );

        if (!response) {
            return res.status(400).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", response });
    } catch (error) {
        console.error("Updation error:", error);
        res.status(500).json({ error: "Server error while updating profile" });
    }
};

const UpdatePassword = async(req,res)=>{
    try{
        const {userId} = req.User;
        const {password} = req.body;
    
        const hashedPassword = await bcrypt.hash(password,10);

        const response = await User.findByIdAndUpdate(userId,{hashedPassword},{new:true});

        return res.status(200).json({message:"Password updated successfully",response});
    }
    catch(error){
        console.error("Error while updating password",error);
        res.status(500).json({error:"Server error while updating password"});
    }
}

// Delete user account
const deleteUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const response = await User.findByIdAndDelete(userId);
        if (!response) {
            return res.status(404).json({ error: "User not found or already deleted" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Deletion error:", error);
        return res.status(500).json({ error: "Server error while deleting user" });
    }
};

// Create a post
const CreatePost = async(req, res) =>{
    try{

        const {userId} = req.user;
        const {content, media} = req.body;

        const response = await Post.create({
            user:userId,
            content:content,
            media:media
            });

        return res.status(200).json("Post created successfully", response);
    
    }catch(error){
        console.error("Post creation error:",error);
        res.status(500).json({error:"Server error while creating a post"})
    }
};



module.exports = { profile, updateUser, UpdatePassword, deleteUser, CreatePost, getPost};
