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
      let url = "http://localhost:5000/event";
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
    let { hostName, eventTitle, eventDescription, eventId , btnShow, btnHide, detailsBtnHide, eventMedia} = this.props;
    return (
      <>
        <div className="card my-3" style={{ width: "18rem" }}>
        {eventMedia ? (
            <>
              {eventMedia.match(/\.(jpeg|jpg|png|gif)$/) ? (
                <img
                  src={eventMedia}
                  alt="Event Media"
                  style={{ width: "100%", height: 200 }}
                />
              ) : eventMedia.match(/\.(mp4|webm|ogg)$/) ? (
                <video
                  muted
                  loop
                  controls
                  style={{ width: "100%", height: 200 }}
                >
                  <source src={eventMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : eventMedia.match(/\.(mp3|wav|ogg)$/) ? (
                <audio controls autoPlay>
                  <source src={eventMedia} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              ) : (
                <a
                  href={eventMedia}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download File
                </a>
              )}
            </>
          ) : (
            <>
              <img
                src="https://img.freepik.com/free-psd/virtual-reality-banner-template_23-2148960022.jpg"
                className="card-img-top"
                alt="..."
                style={{ width: "100%", height: "200px" }}
              />
            </>
          )}
          <div className="card-body">
            <h4 className="card-title" style={{fontWeight : "bold"}}>{eventTitle}</h4>
            <h5 className="card-sub-title" style={{fontWeight : "bold"}}><u>Host</u> : {hostName}</h5>
            <p className="card-text">{eventDescription}</p>
            <div className="eventBtns">
            <Link className = {`btn btn-success ${btnShow}`}  to={`/events/${eventId}`} hidden = {btnHide}>Register</Link>
            <Link to={`/events/${eventId}`} className="btn btn-primary" hidden = {detailsBtnHide}>
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
