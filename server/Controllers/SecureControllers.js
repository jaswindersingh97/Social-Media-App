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
        const {userId} = req.user;
        const {password} = req.body;
    
        const hashedPassword = await bcrypt.hash(password,10);

        const response = //await User.findByIdAndUpdate(userId,{hashedPassword},{new:true});
await User.updateOne({_id:userId},{password:hashedPassword})
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
        console.log(userId)
        const user = await User.findOne({_id:userId});
        if(!user){
            return res.status(500).json({error:"user doesn't exists"});
        }

        await Post.deleteMany({user:userId});

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
        return res.status(200).json({message:"Post created successfully", response});
    
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

        // if (post.parentPost) {
        //     await Post.findByIdAndUpdate(post.parentPost, {
        //         $pull: { replies: postId }, // Pull by postId, not userId
        //     });
        // }
        // since we can get the reference that a comment was present before deletion

        const response = await Post.deleteOne({_id:postId})
        res.status(200).json({message:"Post deleted successfully",response});

    }catch(error){
        console.error("Error while deleting",error);
        res.status(500).json({error: "Server error while deleting a post"})
    }
};

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
            postId,
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

        // Find the post to comment on
        const post = await Post.findOne({ _id: postId });

        if (!post) {
            return res.status(400).json({ error: "Post doesn't exist" });
        }

        // Find the post owner's user document
        const postOwner = await User.findOne({ _id: post.user }).select('blockedUsers profileType followers');

        // Check if the user is blocked by the post owner
        if (postOwner.blockedUsers.includes(userId)) {
            return res.status(400).json({ error: "User is blocked and cannot comment" });
        }

        // Check if the post owner's profile is private
        if (postOwner.profileType === "private") {
            // Check if the user trying to comment is a follower
            if (!postOwner.followers.includes(userId)) {
                return res.status(400).json({ error: "You cannot comment on this post as the account is private and you do not follow the user" });
            }
        }

        // Find the commenting user to ensure they exist
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        // Create the comment
        const comment = await Post.create({
            user: userId,
            content: content,
            media: media,
            parentPost: postId, 
        });

        // Update the post to include the new comment in the replies
        await Post.findByIdAndUpdate(postId, {
            $push: { replies: comment._id },
        });

        return res.status(201).json({ message: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error while creating a comment", error);
        return res.status(500).json({ error: "Server error while creating a comment" });
    }
};


const LikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.user;
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }

        const post = await Post.findById(postId).select('user likes');
        if (!post) {
            return res.status(400).json({ error: "Post doesn't exist" });
        }

        // Find the post owner's user document
        const postOwner = await User.findOne({ _id: post.user }).select('blockedUsers profileType followers');

        // Check if the user is blocked by the post owner
        if (postOwner.blockedUsers.includes(userId)) {
            return res.status(400).json({ error: "User is blocked and cannot like" });
        }

        // Check if the post owner's profile is private
        if (postOwner.profileType === "private") {
            // Check if the user trying to comment is a follower
            if (!postOwner.followers.includes(userId)) {
                return res.status(400).json({ error: "You cannot like on this post as the account is private and you do not follow the user" });
            }
        }

        const hasLiked = post.likes.some(like => like.toString() === userId);

        if (hasLiked) {
            const response = await Post.findByIdAndUpdate(
                postId,
                { $pull: { likes: userId } },
                { new: true }
            );
            return res.status(200).json({ message: "Post disliked successfully", response });
        } else {
            const response = await Post.findByIdAndUpdate(
                postId,
                { $push: { likes: userId } }, 
                { new: true }
            );
            return res.status(200).json({ message: "Post liked successfully", response });
        }
    } catch (error) {
        console.error("Error while toggling like/dislike", error);
        return res.status(500).json({ error: "Server error while toggling like/dislike" });
    }
};

const followUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const { memberId } = req.params;

        // Prevent users from following themselves
        if (userId === memberId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        // Find the member to follow, including the needed fields
        const member = await User.findById(memberId).select('username followers blockedUsers profileType followRequests');

        // Check if the user to be followed exists
        if (!member) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the current user is blocked by the member
        if (member.blockedUsers.includes(userId)) {
            return res.status(403).json({ error: "You are blocked by this user" });
        }

        let message;

        // Check if the user is already a follower
        if (member.followers.includes(userId)) {
            // If already following, unfollow the member
            await User.findByIdAndUpdate(memberId, { $pull: { followers: userId } });
            await User.findByIdAndUpdate(userId, { $pull: { following: memberId } });
            message = `You have unfollowed ${member.username}`;
        } else {
            // For private profiles, add a follow request instead of directly following
            if (member.profileType === "private") {
                if (member.followRequests.includes(userId)) {
                    return res.status(400).json({ error: "Follow request already sent" });
                }
                await User.findByIdAndUpdate(memberId, { $push: { followRequests: userId } });
                message = `Follow request sent to ${member.username}`;
            } else {
                // For public profiles, directly follow the member
                await User.findByIdAndUpdate(memberId, { $push: { followers: userId } });
                await User.findByIdAndUpdate(userId, { $push: { following: memberId } });
                message = `You are now following ${member.username}`;
            }
        }

        return res.status(200).json({ message });
    } catch (error) {
        console.error("Error while following user", error);
        return res.status(500).json({ error: "Server error while following a user" });
    }
};

const privacy = async(req,res) =>{
    try{
        const {userId} = req.user;
        const {profileType} = req.body;
        const user = User.findByIdAndUpdate(
            userId,
            {profileType},
            {new:true}
        );
        if(!user){
            return res.status(400).json({error:"User doesn't exists"});
        }
        res.status(200).json({message:"Updated the privacy successfully",user});
    }catch(error){
        console.error("Error while updating the privacy",error);
        return res.status(500).json({error:"Server error while updating the privacy of user"})
    }
};

const generateFeed = async(req,res) =>{
    try {
        const {userId} = req.user;
        const { page = 1, limit = 10 } = req.query; // Defaults to page 1 and 10 posts per page

        const user = await User.findById(userId);
        const following = user.following;

        const posts = await Post.find({ user: { $in: [...following,userId] } })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('user')
        
        return res.status(200).json(posts);
    } catch (error) {
        console.error("Error while generating feed",error);
        return res.status(500).json({error:"Server error while generating the feed of user"})
    }
};

const getExplore = async(req,res) =>{
    try {
        const {userId} = req.user;
        const { page = 1, limit = 10 } = req.query; // Defaults to page 1 and 10 posts per page

        const posts = await Post.find()
        .sort({ likes: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('user', 'username avatar')

        return res.status(200).json(posts);  
        
    } catch (error) {        
        console.error("Error while getting Explore",error);
        return res.status(500).json({error:"Server error while generating getting explore"});        
    }
}

module.exports = { 
    profile, 
    updateUser, 
    UpdatePassword, 
    deleteUser, 
    CreatePost, 
    DeletePost, 
    UpdatePost, 
    AddComment,
    LikePost,
    followUser,
    privacy,
    generateFeed,
    getExplore
};

