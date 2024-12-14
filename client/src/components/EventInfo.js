import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

function EventInfo() {
    let {eventId} = useParams();

    const [event, setEvent] = useState([]); 

    const getEvent = async () => {
        try {
            let url = `http://localhost:5000/events/${eventId}`
            const response = await fetch(url);
            const jsonData = await response.json();

            setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
            console.log(event);
            console.log(event.event_title);
            
            
            
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() =>{
        getEvent();
    },[]);

  return (
    <>
        <div className="card mb-3" style={{marginTop : 70}}>
          <img
            src="https://img.freepik.com/free-psd/virtual-reality-banner-template_23-2148960022.jpg"
            className="card-img-top"
            alt="..."
            style={{ width: "100%", height: "600px" }}
          />
          <div className="card-body">
            <h1 className="card-title">{event.event_title}</h1>
            <h3 className=''>Hosted By : {event.host_name}</h3>
            <p className="card-text">
              {event.event_description}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Event Price : {event.event_price}</small>
            </p>
            <p className="card-text">
              <small className="text-body-secondary">Event Capacity : {event.event_capacity}</small>
            </p>
          </div>
        </div>
        <div className="card"></div>
      </>
  )
}

export default EventInfo

