const schemas = require('./../ValidationSchemas/Schemas');

const ValidationMiddleware = (type) => (req, res, next) => {
    const { error } = schemas[type].validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = ValidationMiddleware