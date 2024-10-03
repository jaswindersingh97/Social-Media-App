const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

// User based controller
const getUser = async(req,res) =>{
    try{
        const userId = req.param.userId;
        const response = await User.findOne({_id:userId});

        res.status(200).json({message:"user Found", response});
    }
    catch(error){
        console.error("fetching error",error);
        res.status(500).json({error:"error while fetching user"})
    }
};

// Post based controllers
const getPost = async(req,res) =>{
    try{
        const {postId} = req.param.postId;
        const response = await Post.findOne({_id:postId});

        res.status(200).json({message:"fetched post successfully", response});
    }catch(error){
        console.error("Error while fetching post",error);
        return res.status(500).json({error:"Server error while fetching a post"})
    }
};

const getPostsByUserId = async(req,res) =>{
    try{
        const {userId} = req.param.userId;
        const response = await Post.find({user:userId});

        res.status(200).json({message:"fetched posts successfully", response});
    }catch(error){
        console.error("Error fetching posts by user", error);
        return res.status(500).json({error:"Server error while fetching a user posts"})
    };
}

module.exports = {getUser, getPost, getPostsByUserId}