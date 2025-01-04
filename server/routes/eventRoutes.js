const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const pool = require("../db");
const { createClient } = require("@supabase/supabase-js");
const authorization = require("../middleware/authorization");




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
  upload.single('media'),
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
        `INSERT INTO eventsinfo (host_id, host_name, event_title,event_type, fee_type, event_fee, description,registration_end, event_date,event_time, location, media_url, event_capacity,host_contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
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
        ]
      );
      
      res.status(201).json({
          message: "Event created successfully",
          event: result.rows[0],
        });
        client.release();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Failed to create event", error: error.message });
    }
  }
);

module.exports = router;
