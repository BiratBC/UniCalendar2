import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import PropTypes from 'prop-types'

//Components
import EventItem from "./EventItem.js";

export class Event extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      loading: false,
    };
  }
  async componentDidMount() {
    try {
      let url = "http://localhost:5000/events";
      const response = await fetch(url);
      const jsonData = await response.json();

      // console.log(jsonData);
      this.setState({
        events: jsonData,
      });
      // console.log(this.state.events);
    } catch (error) {
      console.error(error.message);
    }
  }

  render() {
    return (
      <>
        <div className="container my-3">
        <h2 >Upcoming Events</h2>
          <div className="row" style={{ width: "auto" , marginBottom : 100}} >
            {this.state.events.map((element) => {
              if (element.event_status === "upcoming") {
                return (
                  <div className="col-lg-4" >
                    <EventItem
                      eventId={element.event_id}
                      eventTitle={element.event_title}
                      eventDescription={element.event_description ? element.event_description.slice(0, 100) : ''}
                      hostName={element.host_name}
                    />
                  </div>
                );
              }
            })}            
            <Link to={`/events/status/upcoming`} className="btn btn-secondary" style={{marginTop : 20}}>View more</Link>
          </div>
          <h2>Ongoing Events</h2>
          <div className="row" style={{ width: "auto" , marginBottom : 100}}>
            {this.state.events.map((element) => {
              if (element.event_status === "ongoing") {
                return (
                  <div className="col-lg-4">
                    <EventItem
                      eventId={element.event_id}
                      eventTitle={element.event_title}
                      eventDescription={element.event_description}
                      hostName={element.host_name}
                    />
                  </div>
                );
              }
            })}
            <Link to={`/events/status/ongoing`} className="btn btn-secondary" style={{marginTop : 20}}>View more</Link>
          </div>
          <h2>Completed Events</h2>
          <div className="row" style={{ width: "auto" , marginBottom : 100}}>
            {this.state.events.map((element) => {
              if (element.event_status === "completed") {
                return (
                  <div className="col-lg-4">
                    <EventItem
                      eventId={element.event_id}
                      eventTitle={element.event_title}
                      eventDescription={element.event_description}
                      hostName={element.host_name}
                    />
                  </div>
                );
              }
            })}
          <Link to={`/events/status/completed`} className="btn btn-secondary" style={{marginTop : 20}}>View more</Link>
          </div>
        </div>
      </>
    );
  }
}

export default Event;
