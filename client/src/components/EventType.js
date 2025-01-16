import React, {useState, useEffect} from "react";
import EventItem from "./EventItem";
import { useParams } from "react-router-dom";
import errorImage from "../images/notfound.png";

function EventType(props) {
  const {type} = useParams(); //this returns an object 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchEvents = async () => {
    try {
      const url = `http://localhost:5000/event/type/${type}`;
      setLoading(true);
      const response = await fetch(url);    
      const jsonData = await response.json();
      setEvents(jsonData);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchEvents(events);
  }, [events]);

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
                    <p>Discover the best {type.charAt(0).toLowerCase() + type.slice(1)} events in your area.</p>
                  </div>
                </div>
                <div className="image-section"></div>
              </div>
            </div>
          </div>
          <section className="events">
            <div className="headline">
              <h1 style={{fontFamily: "Neue Plak", textAlign: "center", marginBottom : "10px"}}>
              Explore what's upcoming within {type}
              </h1>
            </div>
            <div
              className="row"
              style={{ width: "auto", marginBottom: 100 }}
              id="eventHorizontalScroll"
            >
              {events.length > 0 ? events
                .filter((event) => event.status === "upcoming")
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
                )):
                <div className="container" id="error-container">
                 <div className="error-image">
                  <img src={errorImage} alt="" />
                 </div>
                 <div className="error-message">
                  <h4>Sorry! There are no upcoming {type} events</h4>
                 </div>
                </div>
                
                }
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default EventType;
