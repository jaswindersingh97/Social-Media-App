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

const DeletePost = async(req, res) =>{
    try{
        const {userId} = req.user;
        const {postId} = req.params;

        const post = await Post.findOne({_id:postId,user:userId});

        if(!post){
            return res.status(400).json({error:"Either postId or UserId is wrong"});
        }

        const response = await Post.deleteOne({_id:postId})
        res.status(200).json({message:"Post deleted successfully",response});

    }catch(error){
        console.error("Error while deleting",error);
        res.status(500).json({error: "Server error while deleting a post"})
    }
}

const UpdatePost = async(req,res) =>{
    try{
        const {postId} = req.params;
        const {userId} = req.user;
        const {content,media} = req.body;
        const post = await Post.findOne({_id:postId,user:userId});

        if(!post){
            return res.status(400).json({error:"Either postId or UserId is wrong"});
        };
        
        const response = await Post.findByIdAndUpdate(
            {userId},
            {content,media},
            {new:true});
        res.status(200).json({message:"Post updated successfully",response});

    }catch(error){
        console.error("error while updating post",error);
        res.status(500).json({error:"Error while updating the post"});
    }
};

const AddComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.user;
        const { content, media } = req.body;
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(400).json({ error: "Post doesn't exist" });
        }

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        const comment = await Post.create({
            user: userId,
            content: content,
            media: media,
            parentPost: postId, 
        });

        await Post.findByIdAndUpdate(postId, {
            $push: { replies: comment._id },
        });

        return res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error while creating a comment", error);
        return res.status(500).json({ error: "Server error while creating a comment" });
    }
};

module.exports = { profile, updateUser, UpdatePassword, deleteUser, CreatePost, getPost, DeletePost, UpdatePost, AddComment};
