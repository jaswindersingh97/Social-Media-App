const User = require("../Models/UserModel");

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
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error while updated profile.' });
    };
};
module.exports = {updateUser};