const pool = require("../db");

const addNotification = async (userId, subject, message) => {
    try {
      await pool.query(
        "INSERT INTO notifications (user_id, subject, message) VALUES ($1, $2, $3)",
        [userId, subject, message]
      );
      console.log(`Notification added for user ${userId}: ${subject}, ${message}`);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };
  
  module.exports = { addNotification };