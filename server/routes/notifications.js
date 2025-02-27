const router = require("express").Router();
const pool  = require("../db");
const authorization  = require('../middleware/authorization');


router.get("/getNotification", authorization,async (req, res) => {
    console.log("req user",req.user);
    
    try {
      const notifications = await pool.query(
        "SELECT * FROM notifications WHERE user_id = $1 ORDER BY is_read ASC, created_at DESC",
        [req.user]
      );
      res.json(notifications.rows);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notifications" });
      console.log(error);
      
    }
  });

  router.put("/read-one/:id", authorization, async (req, res) => {
    const {id} =req.params;
    try {
      const markAsRead = await pool.query("UPDATE notifications SET is_read = $1 WHERE id = $2",
        [true, id]
      );
      res.json({message : "marked as read"});
    } catch (error) {
      res.status(500).json({error : "failed to read"})
    }
  })

  module.exports = router;