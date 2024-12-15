import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventInfo() {
  let { eventId } = useParams();

  const [mode, setMode] = useState("readOnly");
  const changeMode = () => {
    console.log(mode);

    if (mode === "readOnly") {
      setMode("");
    }
    console.log(mode);
  };

  const [event, setEvent] = useState([]);

  const getEvent = async () => {
    try {
      let url = `http://localhost:5000/events/${eventId}`;
      const response = await fetch(url);
      const jsonData = await response.json();

      setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
      console.log(event);
      console.log(event.event_title);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  return (
    <>
      <div className="card mb-3" style={{ marginTop: 70 }}>
        <img
          src="https://img.freepik.com/free-psd/virtual-reality-banner-template_23-2148960022.jpg"
          className="card-img-top"
          alt="..."
          style={{ width: "100%", height: "600px" }}
        />
        <div className="card-body">
          <h1 className="card-title">{event.event_title}</h1>
          <h3 className="">Hosted By : {event.host_name}</h3>
          <textarea
            name=""
            id=""
            value={event.event_description}
            readOnly={mode === "readOnly"}
            style={{ width: "100%", height: 200, resize: "none" }}
            // onChange={{}}
          ></textarea>
          <p className="card-text">
            Event Price :
            <input
              className="mx-2"
              type="text"
              name=""
              id=""
              value={event.event_price}
              readOnly={mode === "readOnly"}
            />
          </p>
          <p className="card-text">
            Event Capacity :
            <input
              className="mx-2"
              type="text"
              name=""
              id=""
              value={event.event_capacity}
              readOnly={mode === "readOnly"}
            />
          </p>
        </div>
        <div
          className="action"
          style={{ display: "flex", justifyContent: "center", gap: 50 }}
        >
          <button
            className="btn btn-primary "
            style={{ width: 100 }}
            onClick={() => {
              changeMode();
            }}
          >
            Edit
          </button>
          <button className="btn btn-danger " style={{ width: 100 }}>
            Delete
          </button>
        </div>
      </div>
      <div className="card"></div>
    </>
  );
}

export default EventInfo;
