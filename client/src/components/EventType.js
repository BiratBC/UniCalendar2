import React, {useState, useEffect} from "react";
import EventItem from "./EventItem";
import { useParams } from "react-router-dom";

function EventType(props) {
  const {type} = useParams(); //this returns an object 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchEvents = async () => {
    try {
      const url = `http://localhost:5000/event/type/${type}`;
      setLoading(true);
      const response = await fetch(url);
      console.log('Response status:', response.status); // Check if we get 200 OK
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      console.log('Received data:', jsonData);
      setEvents(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <div className="container">
        <div className="event-type-section">
          <div className="banner-container">
            <div className="banner">
              <div className="wrapper-banner">
                <div className="text-description">
                  <div className="heading-text">
                    <h1>Club Events</h1>
                  </div>
                  <div className="paragraph-text">
                    <p>Discover the best club events in your area.</p>
                  </div>
                </div>
                <div className="image-section"></div>
              </div>
            </div>
          </div>
          <section className="events">
            <div
              className="row"
              style={{ width: "auto", marginBottom: 100 }}
              id="eventHorizontalScroll"
            >
              {events
                // .filter((event) => event.status === "upcoming")
                .map((element) => (
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
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default EventType;
