import React, { useState, useEffect } from "react";

function MyEventsData(props) {
  const [statusColor, setStatusColor] = useState("");
  const [linkToEvent, setLinkToEvent] = useState("/");

  const handleStatusColor = () => {
    if (props.eventStatus === "upcoming") {
      setStatusColor(
        "https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg"
      );
    } else if (props.eventStatus === "ongoing") {
      setStatusColor("https://www.svgrepo.com/show/408266/yellow-circle.svg");
    } else {
      setStatusColor(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3QOYNQV9XQdX8OigPFftFkxVoGUcVsa17Q&s"
      );
    }
  };

  const handleLink = () => {
    if (props.register == false) {
      setLinkToEvent(`/profile/manage-my-events/${props.eventId}`);
    }
  }

  useEffect(() => {
    handleStatusColor();
    handleLink();
  }, []);

  return (
    <>
      <div className="eventsTable">
             
        <a href={linkToEvent}>
          <div className="table-items">
            <div className="table-item">
              {props.eventTitle.charAt(0).toUpperCase() +
                props.eventTitle.slice(1)}
            </div>
            <div className="table-item">{props.eventDate.slice(0, 10)}</div>
            <div className="table-item">
              {props.eventTime}
            </div>
            <div className="table-item">
              <img
                className="mx-2"
                src={statusColor}
                alt=""
                style={{ width: 20, height: 20 }}
              />
              {props.eventStatus.charAt(0).toUpperCase() +
                props.eventStatus.slice(1)}
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default MyEventsData;
