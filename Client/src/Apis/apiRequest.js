import axios from 'axios';

const domain = import.meta.env.VITE_API_URL;

const apiRequest = async ({ endpoint, method = 'GET', data = {}, headers = {} }) => {
    try {
        const config = {
            url: `${domain}${endpoint}`,
            method,
            headers,
            data,
        };

        const response = await axios(config);
        return response; // returning the response data
    } catch (error) {
        if (error.response) {  
            // Return the error response directly
            return error.response; // { status: 400, data: { error: "Password is incorrect" } }
        } else if (error.request) {
            return { status: 500, data: { error: "Server not responding. Please try again later." } };
        } else {
            // If an error occurred while setting up the request
            return { status: 500, data: { error: error.message } };
        }
    }
};

export default apiRequest;
