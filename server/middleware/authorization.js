
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = async (req, res, next) => {
    try {

        const jwtToken = req.header("token");

        if (!jwtToken) {
            return res.status(403).json("You are not authorised");
        }
        
        //this is the process of decoding the token using the token in req.header and extracting the user_id from the payload object
        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user; //mathi ko function bata decode vako payload object lai req object ma assign 
        // garne so that the 'req' object ko user ko data retrieve huncha through user_id
        
        
        next(); //to give the permission to the respective route after verification

    } catch (error) {
        console.error(error.message);
        return res.status(403).json("You are not authorised");
    }
    
};