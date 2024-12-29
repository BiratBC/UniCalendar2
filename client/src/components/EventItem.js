import React, { Component } from "react";
import { Link } from "react-router-dom";


export class EventItem extends Component {
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
    let { hostName, eventTitle, eventDescription, eventId , btnShow} = this.props;
    return (
      <>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="https://img.freepik.com/free-psd/virtual-reality-banner-template_23-2148960022.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h4 className="card-title">{eventTitle}</h4>
            <h5 className="card-sub-title">{hostName}</h5>
            <p className="card-text">{eventDescription}</p>
            <div className="eventBtns">
            <Link className = {`btn btn-success ${btnShow}`} >Register</Link>
            <Link to={`/events/${eventId}`} className="btn btn-primary">
              View Details
            </Link>

            </div>
            
          </div>
        </div>
      </>
    );
  }
}

export default EventItem;
