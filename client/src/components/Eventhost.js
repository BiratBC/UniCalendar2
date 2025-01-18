import React, { useState } from "react";
import Dashboard from "./Profile.js";
import { toast } from "react-toastify";
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export default function Eventhost(props) {
  const [placeholder, setPlaceholder] = useState("Click above button");
  const [input, setInput] = useState("text");
  const [inputAccess, setInputAccess] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the maximum limit of 50MB");
    } else {
      setFormInputs({ ...formInputs, media: file });
    }
  };

  const inputTypeChange = () => {
    if (placeholder === "Enter Venue full address") {
      setInput("text");
    } else {
      setInput("text");
    }
  };

  const handleClick = (value) => {
    setFormInputs({ ...formInputs, feeType: value });
  };

  const [formInputs, setFormInputs] = useState({
    hostName: "",
    contactNumber: 0,
    eventTitle: "",
    eventType: "",
    feeType: "free",  
    fee: 0,
    registrationEnd: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    eventCapacity: 0,
    media: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    props.setProgress(0);

    const jwtToken = localStorage.getItem("token");

    const formData = new FormData();
    props.setProgress(20);

    // Append regular form fields to FormData
    formData.append("hostName", formInputs.hostName);
    formData.append("contactNumber", formInputs.contactNumber);
    formData.append("eventTitle", formInputs.eventTitle);
    formData.append("eventType", formInputs.eventType);
    formData.append("feeType", formInputs.feeType);
    formData.append("fee", formInputs.fee);
    formData.append("registrationEnd", formInputs.registrationEnd);
    formData.append("eventDate", formInputs.eventDate);
    formData.append("eventTime", formInputs.eventTime);
    formData.append("eventLocation", formInputs.eventLocation);
    formData.append("eventDescription", formInputs.eventDescription);
    formData.append("eventCapacity", formInputs.eventCapacity);

    // If media is selected, append the file to the FormData
    if (formInputs.media) {
      formData.append("media", formInputs.media);
    }
    props.setProgress(40);

    try {
      props.setProgress(60);
      const response = await fetch("http://localhost:5000/event/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      });
      // console.log(response);
      props.setProgress(70);
      if (response.ok) {
        toast.success("Event created successfully");
        props.setProgress(100);
      } else {
        toast.error("Error while creating event. Try again");
        props.setProgress(100);
      }
    } catch (error) {
      console.error(error.message);
      toast.error("Error while creating event. Try again");
    }
  };
  return (
    <>
      <Dashboard />
      <div className="mainContainer">
        <div className="hostContainer">
          <h1>Host Details</h1>
          <form onSubmit={onSubmitForm}>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputFullName">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFullName"
                  placeholder="Ram Shrestha"
                  name="hostName"
                  onChange={handleInputChange}
                  required
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
                  name="email"
                  onChange={handleInputChange}
                  required
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
                  name="contactNumber"
                  onChange={handleInputChange}
                  required
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
                  name="eventType"
                  onChange={handleInputChange}
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
                  name="eventTitle"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="eventSelect">Event Type</label>
                <select
                  id="even  tSelect"
                  className="form-control"
                  onChange={handleInputChange}
                  name="eventType"
                >
                  <option selected>Club</option>
                  <option value={"Seminar"}>Seminar</option>
                  <option value={"Sports"}>Sports</option>
                  <option value={"Webinar"}>Webinar</option>
                  <option value={"Cultural/Festival"}>Cultural-Festival</option>
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
                  id="inlineFormInputGroupDate"
                  placeholder="Date"
                  name="eventDate"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group mb-1 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Time : </div>
                </div>
                <input
                  type="time"
                  className="form-control"
                  id="inlineFormInputGroupTime"
                  placeholder="Time"
                  name="eventTime"
                  onChange={handleInputChange}
                  required
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
              name="eventLocation"
              style={{ marginTop: 10, marginBottom: 30 }}
              onChange={handleInputChange}
              required
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
                      handleClick("free");
                    }}
                    style={{ width: 150 }}
                    name="feeType"
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: 150 }}
                    onClick={() => {
                      setInputAccess(false);
                      handleClick("paid");
                    }}
                    name="feeType"
                  >
                    Esewa/Khalti
                  </button>
                </div>
              </div>
            </div>
            <input
              disabled={inputAccess}
              type="number"
              className="form-control"
              id="inputTitle2"
              placeholder="Rs.XXX"
              style={{ marginTop: 10, marginBottom: 30 }}
              name="fee"
              onChange={handleInputChange}
              required
            />
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="inputCapacity">
                  Event/Ticket Capacity (Optional)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="inputCapacity"
                  placeholder="XXX"
                  style={{ marginTop: 5 }}
                  onChange={handleInputChange}
                  name="eventCapacity"
                />
              </div>
            </div>
            <label htmlFor="inputState">Registration deadline</label>
            <div className="layoutDateTime">
              <div className="input-group mb-1 mr-sm-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Date : </div>
                </div>
                <input
                  type="date"
                  className="form-control"
                  id="inlineFormInputGroupRegstration"
                  placeholder="Username"
                  onChange={handleInputChange}
                  name="registrationEnd"
                  required
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
                  onChange={handleInputChange}
                  name="eventDescription"
                  required
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
                name="media"
                accept=".mp4, image/*"
                style={{ marginBottom: 30, height: 10 }}
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  required
                />
                <a href="/host">I accept the terms and conditions.</a>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: 30, marginBottom: 50 }}
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
