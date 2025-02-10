import React, { useState, useEffect } from "react";
import Dashboard from "./Profile";
import { Link, useParams } from "react-router-dom";
import MyEventsData from "./MyEventsData";

function ManageEvents() {
  // let { hostId } = useParams();

  // const jwtToken = localStorage.getItem("token");

  const [events, setEvents] = useState([]);
  const [statusOptions, setStatusOptions] = useState(["Upcoming", "Ongoing", "Completed"]);
  

  const getEventByHost = async (req, res) => {
    const jwtToken = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/profile/myEvents", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const jsonData = await response.json();
      setEvents(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const changeStatusOption = (e) => {

  }

  useEffect(() => {
    getEventByHost();
  }, []);
//todo : click on the event to go profile/manage-my-events/eventId ----> eventinfo component
  return (
    <>
      <Dashboard />
      <div className="hostContainer">
        <h1>Manage my events</h1>
        <hr />
        <div className="options" style={{ marginRight: 100 }}>
          <div className="dropdown">
            <select
              class="form-select h-100"
              aria-label="Default select example"
              onChange={(e) => {changeStatusOption(e)}}
            >
              <option selected>All</option>
              <option value="1">Upcoming</option>
              <option value="2">Ongoing</option>
              <option value="3">Completed</option>
            </select>
          </div>
          <div className="hostEvents">
            <button className="btn btn-primary btn-lg">Create Event</button>
          </div>
        </div>

        <section
          style={{
            height: 400,
            marginTop: 100,
            marginRight: 100,
          }}
        >
          <div
            className="table"
            style={{ height: 70, backgroundColor: "#5b5b5b" }}
          >
            <div className="table-items">
              <div className="table-item">Events</div>
              <div className="table-item">Date</div>
              <div className="table-item">Time</div>
              <div className="table-item">Status</div>
            </div>
          </div>
          <div>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((element) => (
                <div key={element.event_id}>
                  <MyEventsData
                    eventTitle={element.event_title}
                    eventDate={element.event_date}
                    eventTime={element.event_time}
                    eventStatus={element.status}
                    eventId={element.event_id}
                  />
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default ManageEvents;
