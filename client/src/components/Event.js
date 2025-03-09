import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

// Components
import EventItem from "./EventItem.js";
import Spinner from "./Spinner.js";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(6);
  const [totalRows, setTotalRows] = useState({
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  });
  const [pagination, setPagination] = useState({
    upcoming: { frontPageNumber: 0, lastPageNumber: pageSize },
    ongoing: { frontPageNumber: 0, lastPageNumber: pageSize },
    completed: { frontPageNumber: 0, lastPageNumber: pageSize },
  });

  // Fetch events data when the component mounts
  const fetchEvents = async () => {
    try {
      const url = "http://localhost:5000/event";
      setLoading(true);
      const response = await fetch(url);
      const jsonData = await response.json();
      setEvents(jsonData);      
      setTotalRows({
        upcoming: jsonData.filter((event) => event.status === "upcoming").length,
        ongoing: jsonData.filter((event) => event.status === "ongoing").length,
        completed: jsonData.filter((event) => event.status === "completed").length,
      });

      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  // Slider initialization
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setImageIndex((prevIndex) => {
        if (prevIndex < 3) {
          return prevIndex + 1;
        } else {
          return (prevIndex = 1);
        }
      });
    }, 3000);

    return () => clearInterval(sliderInterval);
  }, []);

  const onPrevBtn = () => {
    setImageIndex((prevIndex) => (prevIndex > 1 ? prevIndex - 1 : prevIndex));
  };
  
  const onNextBtn = () => {
    setImageIndex((prevIndex) => prevIndex + 1);
  };

  //Pagination

  const handlePrevBtn = (category) => {
    setPagination((prev) => {
      const newFrontPage = prev[category].frontPageNumber - pageSize;
      const newLastPage = prev[category].frontPageNumber;
      
      return {
        ...prev,
        [category]: {
          frontPageNumber: Math.max(0, newFrontPage),
          lastPageNumber: newLastPage,
        },
      };
    });
  };
  
  const handleNextBtn = (category) => {
    setPagination((prev) => {
      const newFrontPage = prev[category].frontPageNumber + pageSize;
      const newLastPage = prev[category].frontPageNumber + (pageSize * 2);
      
      return {
        ...prev,
        [category]: {
          frontPageNumber: newFrontPage,
          lastPageNumber: Math.min(totalRows[category], newLastPage),
        },
      };
    });
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="container" style={{position : "relative"}}>
        {!loading ? (
          <>
            <div className="slider">
              <div className="slides">
                <img
                  src={`banner-${imageIndex}.jpg`}
                  alt={`Banner ${imageIndex}`}
                  style={{ width: "100%", height: 500 }}
                  className="slide"
                />
              </div>
              <div className="control">
                <button className="prev" onClick={onPrevBtn}>
                  <i
                    className="fa fa-arrow-left"
                    aria-hidden="true"
                    style={{ fontSize: 20, color: "#2d3235" }}
                  ></i>
                </button>
                <button className="next" onClick={onNextBtn}>
                  <i
                    className="fa fa-arrow-right"
                    aria-hidden="true"
                    style={{ fontSize: 20, color: "#2d3235" }}
                  ></i>
                </button>
              </div>
            </div>
            <div className="moreInfo">
              <div className="textInfo">
                <h1>Stay Connected with Events</h1>
                <p>Make connections and stay updated.</p>
              </div>

              <div className="buttonsForInfo">
                <button className="btn btn-success"> Browse Events</button>
                <button className="btn btn-secondary"> Stay Updated</button>
              </div>
            </div>
            <div className="container my-3" id="event-container">
              <h2>Upcoming Events</h2>
              <div
                className="row"
                style={{ width: "auto", marginBottom: 100 }}
                id="eventHorizontalScroll"
              >
                {events
                  .filter((event) => event.status === "upcoming")
                  .slice(pagination.upcoming.frontPageNumber, pagination.upcoming.lastPageNumber)
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
                        eventMedia={element.media_url}
                        hostName={element.host_name}
                        btnShow="enabled"
                        detailsBtnHide = "hidden"
                      />
                    </div>
                  ))}
                <div className="container d-flex justify-content-between">
                  <button
                    disabled = {pagination.upcoming.frontPageNumber === 0}
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handlePrevBtn("upcoming")}}
                    // hidden={this.state.loading}
                  >
                    &larr; Previous
                  </button>
                  <button
                    disabled= {pagination.upcoming.lastPageNumber >= totalRows.upcoming}
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handleNextBtn("upcoming")}}
                    // hidden={this.state.loading}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
              <h2>Ongoing Events</h2>
              <div className="row" style={{ width: "auto", marginBottom: 100 }}>
                {events
                  .filter((event) => event.status === "ongoing")
                  .slice(pagination.ongoing.frontPageNumber, pagination.ongoing.lastPageNumber)
                  .map((element) => (
                    <div className="col-lg-4" key={element.event_id}>
                      <EventItem
                        eventId={element.event_id}
                        eventTitle={element.event_title}
                        eventDescription={element.description}
                        hostName={element.host_name}
                        eventMedia={element.media_url}
                        btnShow="disabled"
                        btnHide = "hidden"
                      />
                    </div>
                  ))}
                  <div className="container d-flex justify-content-between">
                  <button
                    disabled = {pagination.ongoing.frontPageNumber === 0}
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handlePrevBtn("ongoing")}}
                    // hidden={this.state.loading}
                  >
                    &larr; Previous
                  </button>
                  <button
                    disabled={
                      pagination.ongoing.lastPageNumber >= totalRows.ongoing
                    }
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handleNextBtn("ongoing")}}
                    // hidden={this.state.loading}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
              <h2>Completed Events</h2>
              <div className="row" style={{ width: "auto", marginBottom: 100 }}>
                {events
                  .filter((event) => event.status === "completed")
                  .slice(pagination.completed.frontPageNumber, pagination.completed.lastPageNumber)
                  .map((element) => (
                    <div className="col-lg-4" key={element.event_id}>
                      <EventItem
                        eventId={element.event_id}
                        eventTitle={element.event_title}
                        eventDescription={element.description}
                        hostName={element.host_name}
                        eventMedia={element.media_url}
                        btnShow="disabled"
                        btnHide = "hidden"
                      />
                    </div>
                  ))}
                  <div className="container d-flex justify-content-between">
                  <button
                    disabled = {pagination.completed.frontPageNumber === 0}
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handlePrevBtn("completed")}}
                    // hidden={this.state.loading}
                  >
                    &larr; Previous
                  </button>
                  <button
                    disabled={pagination.completed.lastPageNumber >= totalRows.completed}
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {handleNextBtn("completed")}}
                    // hidden={this.state.loading}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Event;
