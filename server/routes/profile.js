const router = require("express").Router();
const pool  = require("../db");
const authorization  = require('../middleware/authorization');

router.get("/userDetails", authorization, async (req, res) => {
    try {
        //req has the payload object which consists of user_id on 'user' key
        // res.json(req.user); //so req.user => user_id , this comes if verification is true only
        console.log("Extracted User ID from Token:", req.user);
        const user_id = req.user;

        const user = await pool.query("SELECT * FROM users WHERE user_id = $1",
           [user_id]
        );
        console.log(user_id);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user.rows[0]); //important to return the data from backend to frontend
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Server Error" });
    }
})

router.get("/myEvents",authorization, async (req, res) => {
    // console.log(host_id);
    
    try {
        const host_id = req.user;
      const event = await pool.query(
        "SELECT * FROM eventsinfo WHERE host_id = $1",
        [host_id]
      );
  
      res.json(event.rows);
    } catch (error) {
      console.error(error.message);
    }
  });



module.exports = router;