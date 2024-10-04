const RequireAuthentication = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.status(401).json({ error: 'Access denied. Authentication required.' });
    }

    next();
};

module.exports = RequireAuthentication;
