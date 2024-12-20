import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

// Components
import EventItem from "./EventItem.js";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);

  // Fetch events data when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = "http://localhost:5000/events";
        const response = await fetch(url);
        const jsonData = await response.json();
        setEvents(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEvents();
  }, []);

  // Slider initialization
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setImageIndex((prevIndex) => {
        if (prevIndex < 3) {
          return prevIndex + 1;
        } else {
          return prevIndex = 1;
        }
      });
    }, 3000);

    return () => clearInterval(sliderInterval); 
  }, []);

  const onPrevBtn = () => {
    setImageIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : prevIndex));
  };

  const onNextBtn = () => {

    setImageIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <>
      <div className="container">
        <div className="slider">
          <div className="slides">
            <img
              src={`banner-${imageIndex}.jpg`}
              alt={`Banner ${imageIndex}`}
              style={{ width: "100%", height: 500 }}
              className="slide"
            />
          </div>
        <div className="control">
          <button className="prev" onClick={onPrevBtn}>
          <i class="fa fa-arrow-left" aria-hidden="true" style={{fontSize : 20, color : "#2d3235"}}></i>
          </button>
          <button className="next" onClick={onNextBtn}>
          <i class="fa fa-arrow-right" aria-hidden="true" style={{fontSize : 20, color : "#2d3235"}}></i>
          </button>
        </div>
        </div>

        <div
          className="features"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button style={{backgroundColor : "white", border : "none"}}> <div className="feature-list">Host Events</div></button>
          <button style={{backgroundColor : "white", border : "none"}}> <div className="feature-list">Register Events</div></button>
          <button style={{backgroundColor : "white", border : "none"}}> <div className="feature-list">Make connections</div></button>
          <button style={{backgroundColor : "white", border : "none"}}> <div className="feature-list">Stay Updated on events</div></button>
        </div>
      </div>
      <div className="container my-3">
        <h2>Upcoming Events</h2>
        <div className="row" style={{ width: "auto", marginBottom: 100 }}>
          {events
            .filter((event) => event.event_status === "upcoming")
            .map((element) => (
              <div className="col-lg-4" key={element.event_id}>
                <EventItem
                  eventId={element.event_id}
                  eventTitle={element.event_title}
                  eventDescription={
                    element.event_description
                      ? element.event_description.slice(0, 100)
                      : ""
                  }
                  hostName={element.host_name}
                />
              </div>
            ))}
          <Link
            to={`/events/status/upcoming`}
            className="btn btn-secondary"
            style={{ marginTop: 20 }}
          >
            View more
          </Link>
        </div>
        <h2>Ongoing Events</h2>
        <div className="row" style={{ width: "auto", marginBottom: 100 }}>
          {events
            .filter((event) => event.event_status === "ongoing")
            .map((element) => (
              <div className="col-lg-4" key={element.event_id}>
                <EventItem
                  eventId={element.event_id}
                  eventTitle={element.event_title}
                  eventDescription={element.event_description}
                  hostName={element.host_name}
                />
              </div>
            ))}
          <Link
            to={`/events/status/ongoing`}
            className="btn btn-secondary"
            style={{ marginTop: 20 }}
          >
            View more
          </Link>
        </div>
        <h2>Completed Events</h2>
        <div className="row" style={{ width: "auto", marginBottom: 100 }}>
          {events
            .filter((event) => event.event_status === "completed")
            .map((element) => (
              <div className="col-lg-4" key={element.event_id}>
                <EventItem
                  eventId={element.event_id}
                  eventTitle={element.event_title}
                  eventDescription={element.event_description}
                  hostName={element.host_name}
                />
              </div>
            ))}
          <Link
            to={`/events/status/completed`}
            className="btn btn-secondary"
            style={{ marginTop: 20 }}
          >
            View more
          </Link>
        </div>
      </div>
    </>
  );
};

export default Event;
