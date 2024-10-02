const cors = require('cors');

// Allowed origins
const allowedOrigins = [
    "http://localhost:5173",  // Add your frontend domain here
    'http://another-allowed-domain.com'  // Additional domains can be added
];

// Custom CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed methods
    credentials: true, // Allow credentials (e.g., cookies)
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = cors(corsOptions);
