const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/userDetails", authorization, async (req, res) => {
  try {
    //req has the payload object which consists of user_id on 'user' key
    // res.json(req.user); //so req.user => user_id , this comes if verification is true only
    console.log("Extracted User ID from Token:", req.user);
    const user_id = req.user;

    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);
    console.log(user_id);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json(user.rows[0]); //important to return the data from backend to frontend
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.get("/myEvents", authorization, async (req, res) => {
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

router.put("/update-detail", authorization, async (req, res) => {
  const {firstName, lastName, gender, email, phoneNumber, userAddress, userPosition, userCity, userClub, userCountry} = req.body;
  // console.log("Received Data:", req.body);
  // console.log("User ID:", req.user);

  // Check for required fields
  if (!firstName || !lastName || !email || !req.user) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const userNewData = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, gender = $3, user_email = $4, phone_number = $5, position = $6, club = $7, address = $8, city = $9, country = $10 WHERE user_id = $11",[firstName, lastName, gender, email, phoneNumber,userPosition, userClub, userAddress, userCity, userCountry, req.user] 
    );

    res.json("User data updated successfully");
  } catch (error) {
    console.error(error.message);
  }
});

//get registered events

router.get("/participant/events", authorization, async (req, res) => {
  try {
    const registeredEvents = await pool.query("SELECT DISTINCT ON (event_participant.event_id) eventsinfo.* FROM event_participant INNER JOIN eventsinfo ON event_participant.event_id = eventsinfo.event_id WHERE user_id = $1",[req.user]);
    res.json(registeredEvents.rows)

  } catch (error) {
    console.error(error.message);
    
  }
})


//follow
router.post("/follow",authorization, async (req, res) => {
  const {following_id} = req.body;
  if (!req.user) {
    return res.status(401).json({message : "Login to follow"})
  }
  if (req.user === following_id) {
    return res.status(400).json({ message: "You cannot follow yourself"});
  }
  // console.log("Following id : ", following_id);
  // console.log("Follower id : ", req.user);
  
  try {
    await pool.query(
      "INSERT INTO followers (follower_id, following_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [req.user, following_id]
    );
    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//unfollow
router.post("/unfollow",authorization, async (req, res) => {
  const {following_id} = req.body;
  const follower_id = req.user;
  // console.log("follower id", follower_id);
  // console.log("follwing id", following_id);
  
  try {
    await pool.query(
      "DELETE FROM followers WHERE follower_id = $1 AND following_id = $2",
      [follower_id, following_id]
    );
    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get followers count of a user
router.get("/followers/count/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      "SELECT COUNT(*) AS count FROM followers WHERE following_id = $1",
      [userId]
    );
    // Convert the count string to a number
    const count = parseInt(result.rows[0].count, 10);
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//verify following
router.get("/followers",authorization, async (req, res) => {
  const {profileUserId}  = req.params;
  const follower_id = req.user;

  try {
    const result = await pool.query(
      "SELECT following_id, follower_id FROM followers WHERE follower_id = $1",
      [follower_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//following list of a user
router.get("/following",authorization, async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await pool.query(
      "SELECT users.id, users.username FROM followers JOIN users ON followers.following_id = users.id WHERE follower_id = $1",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
