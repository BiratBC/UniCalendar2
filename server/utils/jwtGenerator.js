const jwt = require("jsonwebtoken");
require('dotenv').config();


function jwtGenerator(user_id) {
    const payload = {
        user : user_id
    }

    //THIS IS THE PROCESS OF ENCODING THE JWTTOKEN USING user_id as a payload object
    token = jwt.sign({payload}, process.env.jwtSecret, {expiresIn : "1hr"});
    console.log("Generated Token:", token);
    return jwt.sign({payload}, process.env.jwtSecret, {expiresIn : "1hr"})
    
}

module.exports = jwtGenerator;