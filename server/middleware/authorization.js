const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (req, res, next) => {
    const jwtToken = req.header("Authorization")?.replace("Bearer ", "") || req.header("token");    
    if (!jwtToken) {
        return res.status(403).json({message : "You are not authorised"});
    }  
    try {
        //this is the process of decoding the token using the token in req.header and extracting the user_id from the payload object
        const decoded = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = decoded.payload.user; //mathi ko function bata decode vako payload object lai req object ma assign 
        // garne so that the 'req' object ko user ko data retrieve huncha through user_id
        /* Remeber that payload.user contains user_id  */ 
        next(); //to give the permission to the respective route after verification or continue
    } catch (error) {
        console.error("Token verification failed:",error.message);
        return res.status(403).json({message :"Login or authorization required"});
    }
};