import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function EventDetails() {
  let { eventId } = useParams();

  const [event, setEvent] = useState([]);
  const [EventDetails, setEventDetails] = useState({
    eventTitle: "",
    eventDescription: "",
    eventPrice: "",
    eventCapacity: "",
    eventDate: "",
    eventTime: "",
    eventDeadLine: "",
    eventMedia: "",
    eventHostContact: "",
    eventStatus: "",
    eventLocation: "",
  });
  const [formattedDate, setFormattedDate] = useState({
    month: "",
    day: "",
  });
  const [formattedDeadline, setFormattedDeadline] = useState({
    month : "",
    day : "",
  });

  const getEvent = async () => {
    try {
      let url = `http://localhost:5000/event/${eventId}`;
      const response = await fetch(url);
      const jsonData = await response.json();

      setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
      console.log(jsonData);

      setEventDetails({
        eventTitle: jsonData.event_title,
        eventDescription: jsonData.description,
        eventDate: jsonData.event_date,
        eventTime: jsonData.event_time,
        eventCapacity: jsonData.event_capacity,
        eventHostContact: jsonData.host_contact,
        eventDeadLine: jsonData.registration_end,
        eventPrice: jsonData.event_fee,
        eventStatus: jsonData.status,
        eventLocation: jsonData.location,
      });

      //Formatting date
      const eventDate = new Date(jsonData.event_date);
      const month = eventDate.toLocaleString("en-US", { month: "long" });
      const day = eventDate.toLocaleString("en-US", { weekday: "long" });

      const deadlineDate = new Date(jsonData.registration_end);
      const deadlineMonth = deadlineDate.toLocaleString("en-US", {month : "long"});
      const deadlineDay = deadlineDate.toLocaleString("en-US", {weekday : "long"});

      setFormattedDate({ month, day });
      setFormattedDeadline({month : deadlineMonth, day : deadlineDay });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <div className="container mb-3" style={{ marginTop: 70 }}>
        <div className="media-section">
          <div className="media">
            <img
              src="https://img.freepik.com/free-psd/virtual-reality-banner-template_23-2148960022.jpg"
              className="card-img-top"
              alt="..."
            />
          </div>
        </div>
        <div className="event-details">
          <div className="event">
            <div className="date">
              <h4>
                {formattedDate.day}, {formattedDate.month}{" "}
                {EventDetails.eventDate.slice(8, 10)},{" "}
                {EventDetails.eventDate.slice(0, 4)}
              </h4>
            </div>
          </div>
          <div className="event">
            <div className="title">
              <h1>{EventDetails.eventTitle}</h1>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h4>Host Contact </h4>
            </div>
            <div className="hostContact">
              <h5>{EventDetails.eventHostContact}</h5>
            </div>
          </div>
          <div className="event">
            <div className="hostProfile">
              <div className="profilePhoto"></div>
              <div className="hostName"></div>
              <div className="totalFollowers"></div>
              <div className="follow-host"></div>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>Date and time</h3>
            </div>
            <div className="date-time">
              <i className="fa fa-calendar-check-o"></i>
              <h5>
                {formattedDate.day}, {formattedDate.month}{" "}
                {EventDetails.eventDate.slice(8, 10)} {EventDetails.eventTime}
              </h5>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>Location</h3>
            </div>
            <div className="location">
                <i className="fa fa-map-marker"></i>
              <h5>{EventDetails.eventLocation}</h5>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>Event Capacity</h3>
            </div>
            <div className="capacity">
              <h5>{EventDetails.eventCapacity}</h5>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>Event Fee</h3>
            </div>
            <div className="fee">
              <h5>
                {EventDetails.eventPrice > 0 ? EventDetails.eventPrice : "Free"}
              </h5>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>Registration Ends on</h3>
            </div>
            <div className="deadline">
              <h5>{formattedDeadline.day},{formattedDeadline.month} {EventDetails.eventDeadLine.slice(8,10)}</h5>
            </div>
          </div>
          <div className="event">
            <div className="header">
              <h3>About this event</h3>
            </div>
            <div className="description">
              <h5>{EventDetails.eventDescription}</h5>
            </div>
          </div>
        </div>
        <div className="action">
          {EventDetails.eventStatus === "upcoming" ? (
            <>
              <Link
                className="btn btn-success"
                onClick={() => {
                  // handleConfirm(event.event_id);
                }}
                to={`/event/register/${eventId}`}
              >
                Register
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EventDetails;
