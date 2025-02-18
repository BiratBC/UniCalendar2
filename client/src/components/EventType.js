import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import { useParams } from "react-router-dom";
import errorImage from "../images/notfound.png";
import Spinner from "./Spinner";

function EventType(props) {
  const { type } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEvents = async () => {
    try {
      const url = `http://localhost:5000/event/type/${type}`;
      setLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setEvents(Array.isArray(jsonData) ? jsonData : []);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setEvents([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [type]);

  const upcomingEvents = events.filter((event) => event.status === "upcoming");

  return (
    <>
      <div className="container">
        <div className="event-type-section">
          <div className="banner-container">
            <div className="banner">
              <div className="wrapper-banner">
                <div className="text-description">
                  <div className="heading-text">
                    <h1>{type} Events</h1>
                  </div>
                  <div className="paragraph-text">
                    <p>
                      Discover the best{" "}
                      {type.charAt(0).toLowerCase() + type.slice(1)} events in your
                      area.
                    </p>
                  </div>
                </div>
                <div className="image-section"></div>
              </div>
            </div>
          </div>
          <section className="events">
            <div className="headline">
              <h1
                style={{
                  fontFamily: "Neue Plak",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Explore what's upcoming within {type}
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                gap: "20px",
                padding: "20px",
              }}
            >
              {loading ? (
                <div><Spinner/></div>
              ) : upcomingEvents.length > 0 ? (
                upcomingEvents.map((element) => (
                  <div
                    className="col-lg-4"
                    key={element.event_id}
                    id="card-item"
                  >
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
                ))
              ) : (
                <div className="container" id="error-container">
                  <div className="error-image">
                    <img src={errorImage} alt="No events found" />
                  </div>
                  <div className="error-message">
                    <h4>Sorry! There are no upcoming {type} events</h4>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default EventType;