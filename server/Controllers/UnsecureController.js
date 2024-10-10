const User = require("../Models/UserModel");
const Post = require("../Models/PostModel");

// User based controller
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const response = await User.findOne({ _id: userId });

        if (!response) {
            return res.status(404).json({ error: "User not found" });
        }

        if (req.isAuthenticated === true) {
            const loggedUserId = req.user.userId; // Assuming req.user contains { userId, ... }

            // Check if the logged-in user is in the blocked users list
            if (response.blockedUsers.includes(loggedUserId)) {
                // If blocked, return limited user info
                const limitedResponse = await User.findOne({ _id: userId })
                    .select('name profilePhoto bio');
                return res.status(200).json(limitedResponse);
            }
        }

        // If not blocked, return full user info
        res.status(200).json({ message: "User found", user: response });
    } catch (error) {
        console.error("Error fetching user", error);
        res.status(500).json({ error: "Error while fetching user" });
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
        console.error("error while fetching followings",error);
        return res.status(500).json({error:"Server error while fetching followings"})
    }
};

const getSearch = async (req, res) => {
    try {
        const { keyword, page = 1, limit = 10 } = req.query;
        const currentUserId = req.isAuthenticated ? req.user._id : null; // Check if user is logged in
        
        let matchCriteria = {};
        
        // Add keyword search criteria
        if (keyword) {
            matchCriteria.$or = [
                { content: { $regex: keyword, $options: 'i' } }, // Search in post content
                { 'userDetails.username': { $regex: keyword, $options: 'i' } } // Search in username
            ];
        }
        
        const results = await Post.aggregate([
            {
                $lookup: {
                    from: 'users', // Assuming User collection name is `users`
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $match: {
                    ...matchCriteria,
                    $or: [
                        // For logged-in users
                        {
                            $and: [
                                { 'userDetails.blockedUsers': { $ne: currentUserId } },
                                {
                                    $or: [
                                        { 'userDetails.accountType': 'public' }, // Allow public posts
                                        {
                                            $and: [
                                                { 'userDetails.accountType': 'private' },
                                                { 'userDetails.followers': currentUserId } // Only followers can see private posts
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // For non-logged-in users - only public accounts OR partial info for private accounts by username search
                        {
                            $and: [
                                { 'userDetails.accountType': 'public' }, // Non-logged-in users only see public
                                { $expr: { $eq: [currentUserId, null] } }
                            ]
                        },
                        {
                            $and: [
                                { 'userDetails.accountType': 'private' }, // Only search by username
                                { $expr: { $eq: [currentUserId, null] } },
                                { 'userDetails.username': { $regex: keyword, $options: 'i' } } // Private profile partial info
                            ]
                        }
                    ]
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            { 
                $project: {
                    content: { 
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ['$userDetails.accountType', 'private'] },
                                    { $not: [{ $eq: [currentUserId, null] }] },
                                    { $not: [{ $in: [currentUserId, '$userDetails.followers'] }] }
                                ]
                            },
                            then: null, // Do not show content for private posts unless logged in and following
                            else: "$content"
                        }
                    },
                    user: 1,
                    'userDetails.username': 1,
                    'userDetails.accountType': 1,
                    createdAt: 1 // Include other fields as needed
                }
            }
        ]);

        res.status(200).json({ results });
    
    } catch (error) {
        console.error("Error while searching:", error);
        return res.status(500).json({ error: "Server error while searching" });
    }
}

const searchUser = async(req,res) =>{
    try {
        const { keyword, page = 1, limit = 10 } = req.query;
        const currentUserId = req.isAuthenticated ? req.user._id : null; // Check if user is logged in
        
        let matchCriteria = {};

        // Add username search criteria only
        if (keyword) {
            matchCriteria = {
                'userDetails.username': { $regex: keyword, $options: 'i' } // Search in username
            };
        }
        
        const results = await Post.aggregate([
            {
                $lookup: {
                    from: 'users', // Assuming User collection name is `users`
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $match: {
                    ...matchCriteria,
                    $or: [
                        // For logged-in users
                        {
                            $and: [
                                { 'userDetails.blockedUsers': { $ne: currentUserId } },
                                {
                                    $or: [
                                        { 'userDetails.accountType': 'public' }, // Allow public posts
                                        {
                                            $and: [
                                                { 'userDetails.accountType': 'private' },
                                                { 'userDetails.followers': currentUserId } // Only followers can see private posts
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // For non-logged-in users - only public accounts OR partial info for private accounts by username search
                        {
                            $and: [
                                { 'userDetails.accountType': 'public' }, // Non-logged-in users only see public
                                { $expr: { $eq: [currentUserId, null] } }
                            ]
                        },
                        {
                            $and: [
                                { 'userDetails.accountType': 'private' }, // Only search by username
                                { $expr: { $eq: [currentUserId, null] } },
                                { 'userDetails.username': { $regex: keyword, $options: 'i' } } // Private profile partial info
                            ]
                        }
                    ]
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            { 
                $project: {
                    content: { 
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ['$userDetails.accountType', 'private'] },
                                    { $not: [{ $eq: [currentUserId, null] }] },
                                    { $not: [{ $in: [currentUserId, '$userDetails.followers'] }] }
                                ]
                            },
                            then: null, // Do not show content for private posts unless logged in and following
                            else: "$content"
                        }
                    },
                    user: 1,
                    'userDetails.username': 1,
                    'userDetails.accountType': 1,
                    createdAt: 1 // Include other fields as needed
                }
            }
        ]);

        res.status(200).json({ results });
    
    } catch (error) {
        console.error("Error while searching:", error);
        return res.status(500).json({ error: "Server error while searching" });}
};

const searchPost = async(req,res) =>{
    try {
        const { keyword, page = 1, limit = 10 } = req.query;
        const currentUserId = req.isAuthenticated ? req.user._id : null; // Check if user is logged in
        
        let matchCriteria = {};

        // Add search criteria for post content only
        if (keyword) {
            matchCriteria = {
                content: { $regex: keyword, $options: 'i' } // Search in post content
            };
        }
        
        const results = await Post.aggregate([
            {
                $lookup: {
                    from: 'users', // Assuming User collection name is `users`
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            { $unwind: '$userDetails' },
            {
                $match: {
                    ...matchCriteria,
                    $or: [
                        // For logged-in users
                        {
                            $and: [
                                { 'userDetails.blockedUsers': { $ne: currentUserId } },
                                {
                                    $or: [
                                        { 'userDetails.accountType': 'public' }, // Allow public posts
                                        {
                                            $and: [
                                                { 'userDetails.accountType': 'private' },
                                                { 'userDetails.followers': currentUserId } // Only followers can see private posts
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        // For non-logged-in users - only public accounts
                        {
                            $and: [
                                { 'userDetails.accountType': 'public' }, // Non-logged-in users only see public
                                { $expr: { $eq: [currentUserId, null] } }
                            ]
                        }
                    ]
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: parseInt(limit) },
            { 
                $project: {
                    content: { 
                        $cond: {
                            if: {
                                $and: [
                                    { $eq: ['$userDetails.accountType', 'private'] },
                                    { $not: [{ $eq: [currentUserId, null] }] },
                                    { $not: [{ $in: [currentUserId, '$userDetails.followers'] }] }
                                ]
                            },
                            then: null, // Do not show content for private posts unless logged in and following
                            else: "$content"
                        }
                    },
                    user: 1,
                    'userDetails.username': 1,
                    'userDetails.accountType': 1,
                    createdAt: 1 // Include other fields as needed
                }
            }
        ]);

        res.status(200).json({ results });
    
    } catch (error) {
        console.error("Error while searching:", error);
        return res.status(500).json({ error: "Server error while searching" });
    }
};

module.exports = {getUser, getPost, getComments, getLikes, getFullPost, getPostsByUserId, getFollowers,getFollowing,getSearch,searchUser,searchPost}