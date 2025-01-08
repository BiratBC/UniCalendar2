
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID ="903332596957-sd9i97j8qlmjjhhd547bam8ce5jtkpcr.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID)


module.exports = async (req, res, next) => {
    const jwtToken = req.header("Authorization")?.replace("Bearer ", "") || req.header("token");
    const { token } = req.body;
    
    if (!jwtToken) {
        return res.status(403).json("You are not ");
    }  
    try {
        //this is the process of decoding the token using the token in req.header and extracting the user_id from the payload object
        const decoded = jwt.verify(jwtToken, process.env.jwtSecret);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID, // Specify the client ID for your app
          });
          const payload = ticket.getPayload();
      
          console.log("Verified Payload:", payload);
          res.json({ success: true, user: payload });
        req.user = decoded.payload.user; //mathi ko function bata decode vako payload object lai req object ma assign 
        // garne so that the 'req' object ko user ko data retrieve huncha through user_id
        /* Remeber that payload.user contains user_id  */
        
        next(); //to give the permission to the respective route after verification

    } catch (error) {
        console.error("Token verification failed:",error.message);
        return res.status(403).json("You are not autthorised");
    }
    
};