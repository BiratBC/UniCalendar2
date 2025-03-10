import React, {useState, useEffect} from 'react'
import Dashboard from "./Profile";
import MyEventsData from "./MyEventsData";

const RegisteredEvents = () => {
   
     const[participant, setParticipant] = useState([]);
     const [events, setEvents] = useState([]);
     const [statusOptions, setStatusOptions] = useState(["Upcoming", "Ongoing", "Completed"]);
     
   
     const getRegisteredEvents = async (req, res) => {
       const jwtToken = localStorage.getItem("token");
       try {
         const participant = await fetch("http://localhost:5000/profile/participant/events", {
           headers: {
             Authorization: `Bearer ${jwtToken}`,
           },
         });
         const jsonData = await participant.json();
         setEvents(jsonData);

       } catch (error) {
         console.error(error.message);
       }
     };
   
     const changeStatusOption = (e) => {
   
     }
   
     useEffect(() => {
      getRegisteredEvents();
     }, []);
    
  return (
    <>
    <Dashboard />
      <div className="hostContainer">
        <h1>Your registered Events</h1>
        <hr />
        <div className="options" style={{ marginRight: 100 }}>
          <div className="dropdown">
            <select
              className="form-select h-100"
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
            <button className="btn btn-primary btn-lg">Browse Events</button>
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
                    registered = {true}
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
  )
}

export default RegisteredEvents
