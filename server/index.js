const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");


//middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//ROUTES///

//register and login routes
app.use("/auth", require("./routes/jwtAuth"));

//dashboard route
app.use("/dashboard", require("./routes/dashboard"));

//event route
app.use("/event", require("./routes/eventRoutes"));

//profile route
app.use("/profile", require("./routes/profile"));

//payment route

app.use("/payment", require("./routes/payment"));

//notifications
app.use("/notifications", require("./routes/notifications"));





//Create Event

// app.post("/events", async (req, res) => {
//   try {
//     const {
//       hostName,
//         eventTitle,
//         eventType,
//         feeType,
//         fee,
//         regsistrationEnd,
//         eventDate,
//         eventLocation,
//         eventStatus,
//         eventURL,
//         eventDescription,
//         eventPrice,
//         eventCapacity,
//     } = req.body;
//     const newEvent = await pool.query(
//       "INSERT INTO eventsinfo (host_name, event_title,event_type, fee_type, event_fee, description,registration_end, event_date, location, status, media_url, event_capacity) VALUES($1, $2, $3, $4, $5) RETURNING *",
//       [hostName, eventTitle, eventDescription, eventPrice, eventCapacity]
//     );
//     res.json(newEvent.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// //Get events

// app.get("/events", async (req, res) => {
//   try {
//     const allEvents = await pool.query("SELECT * FROM eventsinfo");
//     res.json(allEvents.rows);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

//get single event

// app.get("/events/:eventId", async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const event = await pool.query(
//       "SELECT * FROM eventsinfo WHERE event_id = $1",
//       [eventId]
//     );

//     res.json(event.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });




//get specific type of event based on status : upcoming, ongoing, completed

// app.get("/events/status/:eventStatus", async (req, res) => {
//   try {
//     const { eventStatus } = req.params;
//     const event = await pool.query(
//       "SELECT * FROM eventsinfo WHERE event_status = $1",
//       [eventStatus]
//     );

//     res.json(event.rows[0]);
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// //Update a event

// app.put("/events/:eventId", async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { eventTitle, eventDescription, eventCapacity, eventPrice } =
//       req.body;
//     const updateEvent = await pool.query(
//       "UPDATE eventsinfo SET event_title = $1 , event_description  = $2, event_capacity = $3, event_price = $4 WHERE event_id  = $5",
//       [eventTitle, eventDescription, eventCapacity, eventPrice, eventId]
//     );
//     res.json("Event has been updated");
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// //delete a event
// app.delete("/events/:eventId", async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const deleteEvent = await pool.query(
//       "DELETE FROM eventsinfo WHERE event_id = $1",
//       [eventId]
//     );

//     res.json("Event is deleted");
//   } catch (error) {
//     console.error(error.message);
//   }
// });


app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
