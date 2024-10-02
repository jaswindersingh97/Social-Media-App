const User = require("../Models/UserModel");

const profile = async(req,res) =>{
    try{
        const {userId} = req.user;
        const response = await User.findOne({_id:userId});
        res.status(200).json({message:"user fetched successfully", response});
    }
    catch(error){
        console.error("Fetching error",error)
        return res.status(400).json({error:"error while fetching profile"})
    }
};

const updateUser = async(req,res) => {
    try{
        const {userId} = req.user;
        const {
            username,
            email,
            profilePicture,
            bio,
            gender
            } = req.body;

        const response = await User.findByIdAndUpdate(userId,{
            username,
            email,
            profilePicture,
            bio,
            gender,
            updatedAt:Date.now(),
            },
            {new:true});    
        
        res.status(200).json({message:"User updated successfully", response }); 
    }
    catch(error){
        console.error('Updation error:', error);
        res.status(500).json({ error: 'Server error while updated profile.' });
    };
};
module.exports = {profile, updateUser};