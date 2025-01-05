import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


function EventInfo() {
  let { eventId } = useParams();

  //states for edit

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [mode, setMode] = useState("readOnly");
  const [originalEvent, setOriginalEvent] = useState({});

  const [event, setEvent] = useState([]);

  const changeMode = () => {
    console.log(mode);

    if (mode === "readOnly") {
      setMode("");
    }
    console.log(mode);
  };

  const getEvent = async () => {
    try {
      let url = `http://localhost:5000/event/${eventId}`;
      const response = await fetch(url);
      const jsonData = await response.json();
 
      setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
      setOriginalEvent(jsonData);
      setDescription(jsonData.description || "");
      setPrice(jsonData.event_fee || "");
      setCapacity(jsonData.event_capacity || "");
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteEvent = async (Id) => {
    try {
      const deleteEvent = await fetch(`http://localhost:5000/event/${Id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  //confirm the changes
  const handleConfirm = async (Id) => {
    try {
      const body = { eventTitle: event.event_title, //the variable name here should maatch the var name with API
        eventDescription: description,
        eventCapacity: capacity, 
        eventPrice: price, };
      const editEvent = await fetch(`http://localhost:5000/event/${Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(editEvent);
      
      if (editEvent.ok) {
        alert("Changes saved successfully!");
        setMode("readOnly");
      } else {
        alert("Failed to save changes!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  //cancel the changes
  const handleCancel = () => {
    setDescription(originalEvent.description || "");
    setPrice(originalEvent.event_fee || "");
    setCapacity(originalEvent.event_capacity || "");
    setMode("readOnly");
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
            value={description}
            readOnly={mode === "readOnly"}
            style={{ width: "100%", height: 200, resize: "none" }}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <p className="card-text">
            Event Price :
            <input
              className="mx-2"
              type="text"
              name=""
              id=""
              value={price}
              readOnly={mode === "readOnly"}
              onChange={(e) => setPrice(e.target.value)}
            />
          </p>
          <p className="card-text">
            Event Capacity :
            <input
              className="mx-2"
              type="text"
              name=""
              id=""
              value={capacity}
              readOnly={mode === "readOnly"}
              onChange={(e) => setCapacity(e.target.value)}
            />
          </p>
        </div>
        <div
          className="action"
          style={{ display: "flex", justifyContent: "center", gap: 50 }}
        >
          {mode === "readOnly" ? (
            <>
              <button
                className="btn btn-primary"
                style={{ width: 100 }}
                onClick={() => setMode("edit")}
              >
                Edit
              </button>
              <Link
                className="btn btn-danger"
                style={{ width: 100 }}
                onClick={() => deleteEvent(event.event_id)}
                to="/"
              >
                Delete
              </Link>
            </>
          ) : (
            <>
              <button
                className="btn btn-success"
                style={{ width: 100 }}
                onClick={() => {
                  handleConfirm(event.event_id);
                }}
              >
                Confirm
              </button>
              <button
                className="btn btn-secondary"
                style={{ width: 100 }}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="card"></div>
    </>
  );
}

export default EventInfo;
