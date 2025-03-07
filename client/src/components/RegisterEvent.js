import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function RegisterEvent() {
  let { eventId } = useParams();
  const [inputVisibility, setinputVisibility] = useState(false);
  const [event, setEvent] = useState([]);
  const [btnVisibility, setBtnVisibility] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    userId : "",
    teamName : "",
    status: "PENDING",
  });
  const [eventDetails, setEventDetails] = useState({
    eventTitle: "",
    eventDate: "",
    feeType: "",
    eventFee: "",
  });
  const [formattedDate, setFormattedDate] = useState({
    month: "",
    day: "",
  });

  const handleOnChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

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
        eventFee: jsonData.event_fee,
      });
      if (jsonData.event_fee > 0) {
        setBtnVisibility(true);
      }
      if (jsonData.fee_type === 'free') {
        setUserDetails((prevState) => ({
          ...prevState,
          status : "FREE"
        }))
      }

      //Formatting date
      const eventDate = new Date(jsonData.event_date);
      const month = eventDate.toLocaleString("en-US", { month: "long" });
      const day = eventDate.toLocaleString("en-US", { weekday: "long" });

      setFormattedDate({ month, day });
    } catch (error) {
      console.error(error.message);
    }
  };

  const registerEvent = async () => {
    // e.preventDefault();
    const jwtToken = localStorage.getItem("token");
    // const body = {}
    console.log("jwt token", jwtToken);

    if (!jwtToken) {
      return (window.location.href = "/login");
    }
    console.log("User Detaisl client side", userDetails);
    try {
      const response = await fetch(
        `http://localhost:5000/event/register/${eventId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }
      );
      //TODO : Not show toast success if it navigate to payment endpoint
      if (response.ok) {
        toast.success("You are registered Successfully!!");
      } else {
        toast.error(response.json);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const jwtToken = localStorage.getItem("token");
      if (!jwtToken) {
        return (window.location.href = "http://localhost:3000/login");
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
      setUserDetails(prevState => ({
        ...prevState,
        firstName: jsonData.first_name,
        lastName: jsonData.last_name,
        email: jsonData.user_email,
        userId : jsonData.user_id,
        contactNumber: jsonData.phone_number,
      }));

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
                    onChange={handleOnChange}
                    name="firstName"
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
                    onChange={handleOnChange}
                    name="lastName"
                  />
                </div>
              </div>
            </div>
            <div className="email">
              <div className="email-label">
                <h3>Email</h3>
              </div>
              <div className="email-input">
                <input
                  value={userDetails.email}
                  type="text"
                  className="form-control"
                  onChange={handleOnChange}
                  name="email"
                />
              </div>
            </div>
            <div className="contact-number">
              <div className="contact-number-label">
                <h3>Contact Number</h3>
              </div>
              <div className="contact-number-input">
                <input
                  value={userDetails.contactNumber}
                  type="text"
                  name="contactNumber"
                  id=""
                  className="form-control"
                  onChange={handleOnChange}
                />
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
                  <div className="input-team-name my-3">
                    <h5>Team Name</h5>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTitle"
                      name="teamName"
                      style={{ marginTop: 10, marginBottom: 30 }}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="payment-box">
              <hr />
              <div
                className="event-fee d-flex"
                style={{ alignItems: "center" }}
              >
                <h3 className="">Event Fee : </h3>
                <h4 className="mx-3">{eventDetails.eventFee}</h4>
              </div>
              <div
                className="esewa-khalti-payment"
                style={{ marginTop: "1rem" }}
              >
                <div className="payment-text">
                  <h3>Payment Method</h3>
                </div>
                <h5>We accept :</h5>
                <div className="payment-icon d-flex">
                  <div className="icon-container">
                    <img
                      src="https://cdn.esewa.com.np/ui/images/logos/esewa-icon-large.png"
                      alt=""
                      style={{ height: 70 }}
                    />
                  </div>
                  <div className="icon-container mx-4">
                    <img
                      src="https://blog.khalti.com/wp-content/uploads/2021/01/khalti-icon.png"
                      alt=""
                      style={{ height: 70 }}
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  required
                />
                <span>
                  By selecting Register, I agree to the UniCalendar Terms of
                  Service
                </span>
              </div>
            </div>
          </div>
          <div className="register-button">
            <Link
              className="btn btn-success"
              onClick={() => {
                registerEvent();
              }}
              to={`/payment-method?amount=${eventDetails.eventFee}&productId=${eventId}&userId=${userDetails.userId}&userFirstName=${userDetails.firstName}&userLastName=${userDetails.lastName}&userContactNumber=${userDetails.contactNumber}&userEmail=${userDetails.email}`}
              hidden={!btnVisibility}
            >
              Register Now
            </Link>
            <Link
              className="btn btn-success"
              onClick={() => {registerEvent()}}
              hidden={btnVisibility}
            >
              Register Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default RegisterEvent;
