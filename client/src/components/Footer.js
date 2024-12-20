import React from "react";

function Footer() {
  return (
    <>
      <footer class="text-center text-lg-start bg-body-tertiary text-muted">
        <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div class="me-5 d-none d-lg-block">
            <span>Get connected with us on social networks:</span>
          </div>
          <div>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-facebook-f"></i>
            </a>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-google"></i>
            </a>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-linkedin"></i>
            </a>
            <a href="/" class="me-4 text-reset">
              <i class="fa fa-github"></i>
            </a>
          </div>
        </section>

        <section class="">
          <div class="container text-center text-md-start mt-5">
            <div class="row mt-3">
              <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">
                  <i class="fa fa-gem me-3"></i>UniCalendar
                </h6>
                <p>
                  UniCalendar is a global self-service event ticketing platform where anyone can host, join, discover and share events. 
                </p>
              </div>
              <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Events</h6>
                <p>
                  <a href="/" class="text-reset">
                    Club
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Sports
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Webinar
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Seminar
                  </a>
                </p>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href="/" class="text-reset">
                    About
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href="/" class="text-reset">
                    Help
                  </a>
                </p>
              </div>

              <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i class="fa fa-home me-3"></i> Dhulikhel, Banepa, Nepal
                </p>
                <p>
                  <i class="fa fa-envelope me-3"></i>
                  unicalendar@gmail.com
                </p>
                <p>
                  <i class="fa fa-phone me-3"></i> +977 9800000000
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          class="text-center p-4"
          style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}
        >
          © 2021 Copyright:
          <a class="text-reset fw-bold" href="/">
            UniCalendar
          </a>
        </div>
      </footer>
    </>
  );
}

export default Footer;
