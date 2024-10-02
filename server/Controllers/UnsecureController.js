const User = require("../Models/UserModel");

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
module.exports = {getUser}