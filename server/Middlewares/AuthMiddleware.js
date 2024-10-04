const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const AuthMiddleware = async(req,res,next)=>{    
    const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            req.isAuthenticated = false;
            return next();
        }
    
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (decoded) {
                req.user = decoded;
                req.isAuthenticated = true;
            } else {
                req.isAuthenticated = false;
            }
        }catch (err){
            req.isAuthenticated = false;
        }
        next();
    };

module.exports = AuthMiddleware;