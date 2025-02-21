import React from "react";

function Footer() {
  return (
    <>
      <footer className="text-center text-lg-start bg-body-tertiary text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-google"></i>
            </a>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="/" className="me-4 text-reset">
              <i className="fa fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <img src="/unical-removebg-preview.png" alt="" style={{height : 40, width : 60}}/>UniCalendar
                </h6>
                <p>
                  UniCalendar is a global self-service event ticketing platform where anyone can host, join, discover and share events. 
                </p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Events</h6>
                <p>
                  <a href="/" className="text-reset">
                    Club
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Sports
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Webinar
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Seminar
                  </a>
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" className="text-reset">
                    About
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="/" className="text-reset">
                    Join Team
                  </a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fa fa-home me-3"></i> Dhulikhel, Banepa, Nepal
                </p>
                <p>
                  <i className="fa fa-envelope me-3"></i>
                  unicalendar@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone me-3"></i> +977 9800000000
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
        >
          © 2025 Copyright:
          <a className="text-reset fw-bold" href="/">
            UniCalendar
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
