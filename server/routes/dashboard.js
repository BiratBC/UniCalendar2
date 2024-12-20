const router = require("express").Router();
const pool  = require("../db");
const authorization  = require('../middleware/authorization');

router.get("/", authorization, async (req, res) => {
    try {
        //req has the payload object which consists of user_id on 'user' key
        // res.json(req.user); //so req.user => user_id , this comes if verification is true only
        console.log("Extracted User ID from Token:", req.user);

        const user = await pool.query("SELECT first_name FROM users WHERE user_id = $1",
           [req.user]
        );
        console.log(req.user);
        
        
        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ user_name: user.rows[0].user_name });
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
})


module.exports = router;