const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const AuthMiddleware = async(req,res,next)=>
    {
        const token = req.headers['authorization']?.split(' ') [1];
        
        if(!token){
            return res.status(401).json({error:'Access denied, no token provided'});
        };

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;  // Attach the decoded token payload to the request (e.g., req.user.userId)
            next();

        } 
        catch (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
    
    }

module.exports = AuthMiddleware;