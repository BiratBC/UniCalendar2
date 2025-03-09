const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const pool = require("../db");
const { createClient } = require("@supabase/supabase-js");
const authorization = require("../middleware/authorization");
const { addNotification } = require("../utils/addNotification");

dotenv.config();

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Supabase config
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper function to upload to Supabase
async function uploadToSupabase(file, path) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(error.message);
  }

  // Construct public URL of the uploaded file
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
}

// Event creation endpoint
router.post(
  "/create",
  authorization,
  upload.single("media"),
  async (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    try {
      const {
        hostName,
        contactNumber,
        eventTitle,
        eventType,
        clubName,
        feeType,
        fee,
        registrationEnd,
        eventDate,
        eventTime,
        eventLocation,
        eventDescription,
        eventCapacity,
      } = req.body;

      const media = req.file;
      const host_id = req.user; //if req.user exists (that is logged in) it will assign req.user,user_id to host_id or null to host_id
      console.log("user id", host_id);

      if (!host_id) {
        return res.status(400).json({ message: "User not authorized" });
      }
      // Upload the media file to Supabase
      let mediaUrl = null;
      if (media) {
        mediaUrl = await uploadToSupabase(
          media,
          `media/${Date.now()}_${media.originalname}`
        );
      }
      // Insert event details into PostgreSQL
      const client = await pool.connect();
      const result = await client.query(
        `INSERT INTO eventsinfo (host_id, host_name, event_title,event_type, fee_type, event_fee, description,registration_end, event_date,event_time, location, media_url, event_capacity,host_contact, club_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14,$15) RETURNING *`,
        [
          host_id,
          hostName,
          eventTitle,
          eventType,
          feeType,
          fee,
          eventDescription,
          registrationEnd,
          eventDate,
          eventTime,
          eventLocation,
          mediaUrl,
          eventCapacity,
          contactNumber,
          clubName,
        ]
      );

      res.status(201).json({
        message: "Event created successfully",
        event: result.rows[0],
      });
      addNotification(
        host_id,
        "Event Created Successfully",
        `Your event ${eventTitle} has been created successfully! You can manage your event and invite participants from your dashboard.`
      );
      client.release();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to create event", error: error.message });
    }
  }
);

//Get event media

router.get("/file/:id", async (req, res) => {
  try {
    const { eventId } = req.params;
    const result = await pool.query(
      "SELECT media_url FROM eventsinfo WHERE event_id = $1",
      [eventId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Media not found" });
    }

    res.json({ fileUrl: result.rows[0].media_url });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get events

router.get("/", async (req, res) => {
  try {
    const allEvents = await pool.query("SELECT * FROM eventsinfo");
    res.json(allEvents.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get single event

router.get("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await pool.query(
      "SELECT * FROM eventsinfo WHERE event_id = $1",
      [eventId]
    );

    res.json(event.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get events based on host id

//TODO

//get specific type of event based on status : upcoming, ongoing, completed

router.get("/status/:eventStatus", async (req, res) => {
  try {
    const { eventStatus } = req.params;
    const event = await pool.query(
      "SELECT * FROM eventsinfo WHERE status = $1",
      [eventStatus]
    );

    res.json(event.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//Update a event

router.put("/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const { eventTitle, eventDescription, eventCapacity, eventPrice } =
      req.body;
    const updateEvent = await pool.query(
      "UPDATE eventsinfo SET event_title = $1 , event_description  = $2, event_capacity = $3, event_price = $4 WHERE event_id  = $5",
      [eventTitle, eventDescription, eventCapacity, eventPrice, eventId]
    );
    res.json("Event has been updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a event
router.delete("/events/:eventId", async (req, res) => {
  try {
    const { eventId } = req.params;
    const deleteEvent = await pool.query(
      "DELETE FROM eventsinfo WHERE event_id = $1",
      [eventId]
    );

    res.json("Event is deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//Events based on Categories : Event TyPE : GET :

router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params; //the variable here and in :type must be same

    const events = await pool.query(
      "SELECT * FROM eventsinfo WHERE event_type = $1",
      [type]
    );
    res.json(events.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Events on Search  : GET : NO AUTH REQ :

router.get("/filter/search", async (req, res) => {
  try {
    const searchEvents = await pool.query("SELECT * FROM eventsinfo");
    res.json(searchEvents.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Register Event
router.post("/register/:eventId", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const { eventId } = req.params;
    console.log(req.body);
    
    //these details i am getting is from register event function 
    const { firstName, lastName, contactNumber, email, teamName, status } = req.body;
      console.log("status", status);
      // console.log();
      
      
    const addParticipant = await pool.query(
      "INSERT INTO event_participant (event_id, user_id, participant_first_name, participant_last_name, participant_contact, participant_email, participant_team_name, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        eventId,
        user_id,
        firstName,
        lastName,
        contactNumber,
        email,
        teamName,
        status,
      ]
    );
    const eventData = await pool.query(
      "SELECT * FROM eventsinfo WHERE event_id = $1",
      [eventId]
    );

    if (addParticipant) {
      addNotification(
        user_id,
        `✅ Registration Confirmed - ${eventData.rows[0].event_title}`,
        `Hi ${firstName},You’ve successfully registered for ${eventData.rows[0].event_title}! 🎟️ 📅 Date: ${eventData.rows[0].event_date} 📍 Location: ${eventData.rows[0].location} Looking forward to seeing you there!`
      );
      res.status(200).json({
        message: "Registered successfully",
      });
      // console.log(addParticipant.rows[0]);
    }
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/event-detail/host-detail/:host_id", async (req, res) => {
  try {
    const { host_id } = req.params;
    console.log("user id", host_id);

    const hostDetail = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [host_id]
    );
    res.json(hostDetail.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
