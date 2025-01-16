import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

// Components
import EventItem from "./EventItem.js";
import Spinner from "./Spinner.js";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch events data when the component mounts
  const fetchEvents = async () => {
    try {
      const url = "http://localhost:5000/event";
      setLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setEvents(jsonData);
      console.log(jsonData);
      
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  // Slider initialization
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setImageIndex((prevIndex) => {
        if (prevIndex < 3) {
          return prevIndex + 1;
        } else {
          return (prevIndex = 1);
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
      {loading && <Spinner />}
      <div className="container">
        {!loading ? (
          <>
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
                  <i
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                    style={{ fontSize: 20, color: "#2d3235" }}
                  ></i>
                </button>
                <button className="next" onClick={onNextBtn}>
                  <i
                    className="fa fa-arrow-right"
                    aria-hidden="true"
                    style={{ fontSize: 20, color: "#2d3235" }}
                  ></i>
                </button>
              </div>
            </div>
            <div className="moreInfo">
              <div className="textInfo">
                <h1>Stay Connected with Events</h1>
                <p>Make connections and stay updated.</p>
              </div>

              <div className="buttonsForInfo">
                <button className="btn btn-success"> Make Connections</button>
                <button className="btn btn-secondary"> Stay Updated</button>
              </div>
            </div>
            <div className="container my-3" id="event-container">
              <h2>Upcoming Events</h2>
              <div className="row" style={{ width: "auto", marginBottom: 100 }} id="eventHorizontalScroll">
                {events
                  .filter((event) => event.status === "upcoming")
                  .map((element) => (
                    <div className="col-lg-4" key={element.event_id} id="card-item"> 
                      <EventItem
                        eventId={element.event_id}
                        eventTitle={element.event_title}
                        eventDescription={
                        element.description
                            ? element.description.slice(0, 100)
                            : ""
                        }
                        hostName={element.host_name}
                        btnShow="enabled"
                      />
                    </div>
                  ))}
                {/* <Link
                  to={`/events/status/upcoming`}
                  className="btn btn-secondary"
                  className="btn btn-secondary"
                  style={{ marginTop: 20 }}
                >
                  View more
                </Link> */}
              </div>
              <h2>Ongoing Events</h2>
              <div className="row" style={{ width: "auto", marginBottom: 100 }}>
                {events
                  .filter((event) => event.status === "ongoing")
                  .map((element) => (
                    <div className="col-lg-4" key={element.event_id}>
                      <EventItem
                        eventId={element.event_id}
                        eventTitle={element.event_title}
                        eventDescription={element.description}
                        hostName={element.host_name}
                        btnShow="disabled"
                      />
                    </div>
                  ))}
              </div>
              <h2>Completed Events</h2>
              <div className="row" style={{ width: "auto", marginBottom: 100 }}>
                {events
                  .filter((event) => event.status === "completed")
                  .map((element) => (
                    <div className="col-lg-4" key={element.event_id}>
                      <EventItem
                        eventId={element.event_id}
                        eventTitle={element.event_title}
                        eventDescription={element.description}
                        hostName={element.host_name}
                        btnShow="disabled"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Event;
