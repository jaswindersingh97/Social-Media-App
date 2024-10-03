const schemas = require('./../ValidationSchemas/Schemas');

const ValidationMiddleware = (schemaType) => (req, res, next) => {
    const { body, params, query } = schemas[schemaType]; // Destructure the body and params schemas

    // Validate body if schema for body exists
    if (body) {
        const { error: bodyError } = body.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ error: bodyError.details[0].message });
        }
    }

    // Validate params if schema for params exists
    if (params) {
        const { error: paramsError } = params.validate(req.params);
        if (paramsError) {
            return res.status(400).json({ error: paramsError.details[0].message });
        }
    }

    if (query) {
        const { error: queryError } = query.validate(req.query);
        if (queryError) {
            return res.status(400).json({ error: queryError.details[0].message });
        }
    }

    next(); // Move to the next middleware if no errors
};


module.exports = ValidationMiddleware