import React, { useState } from "react";
import Dashboard from "./Profile.js";

export default function Eventhost(props) {
  const [placeholder, setPlaceholder] = useState("Click above button");
  const [input, setInput] = useState("text");
  const [inputAccess, setInputAccess] = useState(true);
  const inputTypeChange = () => {
    if (placeholder === "Enter Venue full address") {
      setInput("text");
    } else {
      setInput("text");
    }
  };
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };


  const [hostName, setHostName] = useState("");


  const [eventTitle, setEventTitle] = useState("");


  const [eventDescription, setEventDescription] = useState("");


  const [eventPrice, setEventPrice] = useState("");


  const [eventCapacity, setEventCapacity] = useState("");


  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {

      const body = {hostName, eventTitle, eventDescription, eventPrice, eventCapacity};
      const response = await fetch("http://localhost:5000/events",{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify(body)
      })

      console.log(response);
      
      
    } catch (error) {
      console.error(error.message);
      
    }
  }

  return (
    <>
      <Dashboard />
      <div className="mainContainer">
        <div className="hostContainer">
          <h1>Host Details</h1>
          <form onSubmit={onSubmitForm}>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputFirstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  placeholder="Ram"
                  value={hostName}
                  onChange={e => {setHostName(e.target.value)}}
                />
              </div>
              <div className="form-group col-md-8">
                <label htmlFor="inputLastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLastName"
                  placeholder="Shrestha"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="ram1@gmail.com"
                />
              </div>
              <div className="form-group col-md-8">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="*********"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputContact">Contact Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="inputContact"
                  placeholder="9800000000"
                />
              </div>
              <div className="form-group col-md-8">
                <label htmlFor="inputClubName">
                  Name of Club/Organization/Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputClubName"
                  placeholder="KUCC"
                />
              </div>
            </div>
            <h1>Event Details</h1>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputTitle">Event Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle1"
                  placeholder="IT Meet 2025"
                  value={eventTitle}
                  onChange={e => {setEventTitle(e.target.value)}}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="eventSelect">Event Type</label>
                <select id="even  tSelect" className="form-control" value={selectedValue} onChange={handleChange}>
                  <option selected>Club</option>
                  <option value={"Seminar"}>Seminar</option>
                  <option value={"Sports"}>Sports</option>
                  <option value={"Webinar"}>Webinar</option>
                  <option value={"Cultural/Festival"}>Cultural/Festival</option>
                  <option value={"Workshop"}>Workshop</option>
                  <option value={"Other"}>Other</option>
                </select>
              </div>
            </div>
            <label htmlFor="inputState">Date and Time</label>
            <div className="layoutDateTime">
              <div className="input-group mb-1 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Date : </div>
                </div>
                <input
                  type="date"
                  className="form-control"
                  id="inlineFormInputGroupUsername1"
                  placeholder="Username"
                />
              </div>
              <div className="input-group mb-1 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Time : </div>
                </div>
                <input
                  type="time"
                  className="form-control"
                  id="inlineFormInputGroupUsername2"
                  placeholder="Username"
                />
              </div>
            </div>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic example"
              style={{ marginTop: 30 }}
            >
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: 150 }}
                onClick={() => {
                  inputTypeChange();
                  setPlaceholder("Enter Venue full address");
                }}
              >
                Venue
              </button>
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: 150 }}
                onClick={() => {
                  inputTypeChange();
                  setPlaceholder("Enter Online link or Code");
                }}
              >
                Online Event
              </button>
            </div>
            <input
              type={input}
              className="form-control"
              id="inputTitle"
              placeholder={placeholder}
              style={{ marginTop: 10, marginBottom: 30 }}
            />

            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputPaymentMethod">Enter Payment Method</label>
                <br></br>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                  style={{ marginTop: 5 }}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setInputAccess(true);
                    }}
                    style={{ width: 150 }}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: 150 }}
                    onClick={() => {
                      setInputAccess(false);
                    }}
                  >
                    Esewa/Khalti
                  </button>
                </div>
              </div>
            </div>
            <input
              disabled={inputAccess}
              type="text"
              className="form-control"
              id="inputTitle2"
              placeholder="Rs.XXX"
              style={{ marginTop: 10, marginBottom: 30 }}
              value={eventPrice}
              onChange={e => {setEventPrice(e.target.value)}}
            />
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputCapacity">
                  Event/Ticket Capacity (Optional)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCapacity"
                  placeholder="XXX"
                  style={{ marginTop: 5 }}
                  value={eventCapacity}
                  onChange={e => {setEventCapacity(e.target.value)}}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputCapacity">Event Description</label>
                <textarea
                  type="text"
                  className="form-control"
                  id="eventDescription"
                  placeholder="Describe your event in a paragraph"
                  style={{ height: 150, marginTop: 5 }}
                  value={eventDescription}
                  onChange={e => {setEventDescription(e.target.value)}}
                />
              </div>
            </div>
            <div>
              <label htmlFor="formFileLg" className="form-label">
                Event Media (Only one file can be uploaded, so upload any video
                or banner):
              </label>
              <input
                className="form-control form-control-lg"
                id="formFileLg"
                type="file"
                accept=".mp4, image/*"
                style={{ marginBottom: 30, height: 10 }}
              />
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <a href="/host">I accept the terms and conditions.</a>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{marginTop : 30, marginBottom : 50}} >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
