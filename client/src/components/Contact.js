import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {toast} from 'react-toastify';

function Contact() {
  const form = useRef();

  const SERVICE_ID = "service_e35ggfv";
  const TEMPLATE_ID = "template_xztw0wn";
  const PUBLIC_KEY = "kLmEFESh22wGEez2q";

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Message sent successfully");
          
        },
        (error) => {
          console.log("FAILED...", error);
          toast.error("Error while sending message");
        }
      );
  };

  return (
    <>
      <div className="imageContainer" id="contactContainer">
        <h1>
          Get In Touch <br />
          <span>UniCalendar : All events, One Platform</span>
        </h1>
      </div>

      <section className="contact">
        <div className="resizeContainer">
          <div className="getInTouch">
            <h1>Get in touch</h1>
            <div className="contacts">
              <div className="contactElements">
                <p>
                  <i class="fa fa-envelope" style={{ fontSize: 48 }}></i>
                  <h3>Email</h3>
                  <h5>unicalendar@gmail.com</h5>
                </p>
              </div>
              <div className="contactElements">
                <p>
                  <i class="fa fa-phone" style={{ fontSize: 48 }}></i>
                  <h3>Phone Number</h3>
                  <h5>+977 - 9800000000</h5>
                </p>
              </div>
              <div className="contactElements">
                <p>
                  <i class="fa fa-map-marker" style={{ fontSize: 48 }}></i>
                  <h3>Location</h3>
                  <h5>Dhulikhel, Kavrepalanchok, Nepal</h5>
                </p>
              </div>
              <div className="contactElements">
                <p>
                  <i class="fa fa-clock-o" style={{ fontSize: 48 }}></i>
                  <h3>Working Hours</h3>
                  <h5>Sunday to Friday</h5>
                  <h6>9AM - 4PM</h6>
                </p>
              </div>
            </div>
          </div>

          <div className="contactUs">
            <h1>Message Us</h1>
            <form onSubmit={sendEmail} ref={form}>
              <div className="name-container">
                <input
                  type="text"
                  style={{ marginRight: 20, marginBottom: 20 }}
                  placeholder="Full name"
                  name="from_name"
                />
              </div>
              <div className="email-container">
                <input
                  type="text"
                  style={{ marginRight: 20, marginBottom: 20 }}
                  placeholder="Email Address"
                  name="from_email"
                />
              </div>
              <div className="message-container">
                <textarea name="message" id="" cols={63} placeholder="Message"/>{" "}
                <br />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
