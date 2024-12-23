import React from "react";

function Contact() {
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
            <form>
              <input
                type="text"
                style={{ marginRight: 20, marginBottom: 20 }}
                placeholder="First name"
              />
              <input type="text" placeholder="Last name" />
              <input
                type="text"
                style={{ marginRight: 20, marginBottom: 20 }}
                placeholder="Email Address"
              />
              <input type="text" placeholder="Contact Number" />
              <textarea name="" id="" cols={65} placeholder="Message" /> <br />
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
