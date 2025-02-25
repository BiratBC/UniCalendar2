const router = require("express").Router();
const pool  = require("../db");
const authorization  = require('../middleware/authorization');


router.get("/getNotification", authorization,async (req, res) => {
    console.log("req user",req.user);
    
    try {
      const notifications = await pool.query(
        "SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC",
        [req.user]
      );
      res.json(notifications.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
      console.log(error);
      
    }
  });

  module.exports = router;