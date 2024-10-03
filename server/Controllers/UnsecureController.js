const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

// User based controller
const getUser = async(req,res) =>{
    try{
        const userId = req.params.userId;
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
        const {postId} = req.params;
        const response = await Post.findOne({_id:postId});

        res.status(200).json({message:"fetched post successfully", response});
    }catch(error){
        console.error("Error while fetching post",error);
        return res.status(500).json({error:"Server error while fetching a post"})
    }
};


const getComments = async(req,res) =>{
    try{
        const {postId} = req.params;
        const response = await Post.findOne({_id:postId}).populate({
            path:'replies',
            populate:{
                path:'User',
                select:'username profilePicture'
            }
        });

        res.status(200).json({message:"fetched post successfully", response});
    }catch(error){
        console.error("Error while fetching post",error);
        return res.status(500).json({error:"Server error while fetching a post"})
    }
};

const getLikes = async(req,res) =>{
    try{
        const {postId} = req.params;
        const response = await Post.findOne({_id:postId}).populate({
            path:'likes',
            select:'username profilePicture'
        });

        res.status(200).json({message:"fetched post successfully", response});
    }catch(error){
        console.error("Error while fetching post",error);
        return res.status(500).json({error:"Server error while fetching a post"})
    }
};

const getFullPost = async(req,res)=>{
    try{
        const {postId} = req.params;
        const response = await Post.findOne({_id:postId})
        .populate({
            path:'likes',
            select:'username profilePicture'
        })
        .populate({
            path:'replies',
            populate:{
                path:'User',
                select:'username profilePicture'
            }
        });

        res.status(200).json({message:"fetched post successfully", response});
    }catch(error){
        console.error("Error while fetching post",error);
        return res.status(500).json({error:"Server error while fetching a post"})
    }

};

const getPostsByUserId = async(req,res) =>{
    try{
        const {userId} = req.params;
        const response = await Post.find({user:userId});

        res.status(200).json({message:"fetched posts successfully", response});
    }catch(error){
        console.error("Error fetching posts by user", error);
        return res.status(500).json({error:"Server error while fetching a user posts"})
    };
};

const getFollowers = async(req,res) => {
    try{
        const {userId} = req.params;

        const user = await User.findById(userId).select('followers');

        if(!user){
            res.status(400).json({error:"User not found"});
        }
        res.status(200).json({message:"followers fetched successfully",user});
        
    }catch(error){
        console.error("error while fetching followers",error);
        return res.status(500).json({error:"Server error while fetching followers"})
    }
};

const getFollowing = async(req,res) => {
    try{
        const {userId} = req.params;

        const user = await User.findById(userId).select('following');

        if(!user){
            res.status(400).json({error:"User not found"});
        }
        res.status(200).json({message:"following fetched successfully",user});
        
    }catch(error){
        console.error("error while fetching following",error);
        return res.status(500).json({error:"Server error while fetching following"})
    }
};


module.exports = {getUser, getPost, getComments, getLikes, getFullPost, getPostsByUserId, getFollowers,getFollowing}