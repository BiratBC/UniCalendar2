const router = require("express").Router();
const pool  = require("../db");
const authorization  = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        //req has the payload object which consists of user_id on 'user' key
        // res.json(req.user); //so req.user => user_id , this comes if verification is true only


        const user = await pool.query("SELECT first_name, last_name FROM users WHERE user_id = $1",
            [req.user]
        );
        res.json(user.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        
    }
})


module.exports = router;