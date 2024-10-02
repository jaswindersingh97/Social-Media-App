const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../Models/UserModel');

const registerUser = async (req, res) => {
    try {
        // Destructure values from the request body
        const { username, email, password, gender } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email.' });
        }

        // Hash the password with await to ensure it's done before proceeding
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const response = (await User.create({ username, email, password: hashedPassword, gender }));
        res.status(201).json({Message:"user Created successfully",_id:response._id}); // 201 Created
    
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

const loginUser = async(req,res) =>{
    try{

        const { email , password } = req.body;
        
        // Find the user and explicitly include the password field
        const user = await User.findOne({email}).select("+password");
        
        // Check if the user exists
        if(!user){
            return res.status(400).json({error:"Invalid email or password."});
        }
            
        // Compare the provided password with the hashed password in the database
        const isMatch = bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error:"Invalid email or password."});
        }

        // Generate JWT
        const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
        const token = jwt.sign(
            {userId:user._id},
            JWT_SECRET,
            {expiresIn:"8h"}
        );
        
        res.status(200).json({token:token,message:"Login successfull"});

    }
    catch(error){
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }

};

module.exports = {registerUser,loginUser};