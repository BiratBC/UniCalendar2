import React from "react";
import { Link } from "react-router-dom";

function SearchBarListItem(props) {
  let { eventTitle, eventDescription, eventId } = props;
  const handleOnClick = () => {
    window.location.reload();
  };
  return (
    <div className="container">
      <button
        className="card my-2"
        onClick={handleOnClick}
        style={{ width: "100%", textAlign: "left" }}
      >
        <div className="card-body ">
          <h5 className="card-title">{eventTitle}</h5>
          <p className="card-text">{eventDescription.slice(0, 50)}</p>
          <Link to={`/events/${eventId}`} className="stretched-link"></Link>
        </div>
      </button>
    </div>
  );
}

export default SearchBarListItem;
