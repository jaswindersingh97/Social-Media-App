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

const AuthRoutes = require('./Endpoints/AuthRoutes');
app.use("/api/auth",AuthRoutes);


const RequireAuthentication = require('./Middlewares/RequireAuthentication');
const AuthMiddleware = require('./Middlewares/AuthMiddleware');
const SecureRoutes = require('./Endpoints/SecureRoutes');
app.use("/api/secure",AuthMiddleware,RequireAuthentication,SecureRoutes);

const UnsecureRoutes = require('./Endpoints/UnsecureRoutes');
app.use("/api/unsecure",AuthMiddleware,UnsecureRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is running on port", port);
})