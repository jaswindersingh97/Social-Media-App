const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
connectDB();

const corsConfig = require('./config/cors');
app.use(corsConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test Route for ping
app.get("/helloWorld",(req,res)=>{
    res.send("Hello World");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server is running on port", port);
})