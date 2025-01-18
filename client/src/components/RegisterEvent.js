import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RegisterEvent() {
  let { eventId } = useParams();
  const [inputVisibility, setinputVisibility] = useState(false);
  const [event, setEvent] = useState([]);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
  });
  const [eventDetails, setEventDetails] = useState({
    eventTitle: "",
    eventDate: "",
    feeType: "",
  });
  const [formattedDate, setFormattedDate] = useState({
    month: "",
    day: "",
  });

  const getEvent = async () => {
    try {
      let url = `http://localhost:5000/event/${eventId}`;
      const response = await fetch(url);
      const jsonData = await response.json();

      setEvent(jsonData); //we cannot access jsonData variable outside this try block so we created a state named event
      console.log(jsonData);

      setEventDetails({
        eventTitle: jsonData.event_title,
        eventDate: jsonData.event_date,
        feeType: jsonData.fee_type,
      });

      //Formatting date
      const eventDate = new Date(jsonData.event_date);
      const month = eventDate.toLocaleString("en-US", { month: "long" });
      const day = eventDate.toLocaleString("en-US", { weekday: "long" });

      setFormattedDate({ month, day });
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (!jwtToken) {
        console.log("Unable to load User details");
      }
      const userDetails = await fetch(
        `http://localhost:5000/profile/userDetails`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      const jsonData = await userDetails.json();
      setUserDetails({
        firstName: jsonData.first_name,
        lastName: jsonData.last_name,
        email: jsonData.user_email,
        contactNumber: jsonData.phone_number,
      });

      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getEvent();
    getUser();
  }, []);

  return (
    <>
      <div className="container" style={{ marginTop: 70 }}>
        <section className="event-register">
          <div className="event-details-register">
            <div className="eventDateTime">
              <h4>
                {formattedDate.day}, {formattedDate.month}{" "}
                {eventDetails.eventDate.slice(8, 10)}
              </h4>
            </div>
            <div className="eventTitle">
              <h1>{eventDetails.eventTitle}</h1>
            </div>
          </div>
          <div className="personal-info">
            <div className="name">
              <div className="first-name">
                <div className="first-name-label">
                  <h3>First Name</h3>
                </div>
                <div className="first-name-input">
                  <input
                    value={userDetails.firstName}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="last-name">
                <div className="last-name-label">
                  <h3>Last Name</h3>
                </div>
                <div className="last-name-input">
                  <input
                    value={userDetails.lastName}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="email">
              <div className="email-label">
                <h3>Email</h3>
              </div>
              <div className="email-input">
                <input value={userDetails.email} type="text" className="form-control" />
              </div>
            </div>
            <div className="contact-number">
              <div className="contact-number-label">
                <h3>Contact Number</h3>
              </div>
              <div className="contact-number-input">
                <input value={userDetails.contactNumber} type="text" name="" id="" className="form-control" />
              </div>
            </div>
            <div className="registration-type">
              <h3>Registration Type</h3>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
                style={{ marginTop: 30 }}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "15rem" }}
                  onClick={() => {
                    setinputVisibility(false);
                  }}
                >
                  Single
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: "15rem" }}
                  onClick={() => {
                    setinputVisibility(true);
                  }}
                >
                  Team
                </button>
              </div>
              {inputVisibility && (
                <>
                  <div className="input-team-name">
                    <h5>Team Name</h5>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      name="eventLocation"
                      style={{ marginTop: 10, marginBottom: 30 }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="payment-box"></div>
            {/* TODO : Payment gateway */}
            <div
              className="checkboxes"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="input-1">
                <input
                  type="checkbox"
                  name="updates"
                  id="event-update"
                  style={{
                    height: "auto",
                    width: "auto",
                    marginRight: ".5rem",
                  }}
                />
                <span>
                  Keep me updated on more events and news from this event
                  organizer.
                </span>
              </div>
              <div className="input-2">
                <input
                  type="checkbox"
                  name="terms-and-conditions"
                  id="unicalendar-tos"
                  style={{
                    height: "auto",
                    width: "auto",
                    marginRight: ".5rem",
                  }}
                />
                <span>
                  By selecting Register, I agree to the UniCalendar Terms of
                  Service
                </span>
              </div>
            </div>
          </div>
          <div className="register-button">
            <button className="btn btn-success">Register Now</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default RegisterEvent;
