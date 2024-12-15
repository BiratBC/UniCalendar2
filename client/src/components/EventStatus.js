import React, {useState, useEffect}from 'react';
import { useParams } from "react-router-dom";

function EventStatus() {
    let { eventStatus } = useParams();

  const [event, setEvent] = useState([]);

  const getEvent = async () => {
    try {
      let url = `http://localhost:5000/events/status/${eventStatus}`;
      const response = await fetch(url);
      const jsonData = await response.json();   
      setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getEvent();
  }, [eventStatus]);
  return (
    <div style={{marginTop : 70}}>
        <h1>{eventStatus?  eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1) : ''}</h1>
    </div>
  )
}

export default EventStatus
