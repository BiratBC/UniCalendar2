import React from "react";
import Dashboard from "./Profile.js";

function EventHistory() {
  return (
    <>
      <Dashboard />
      <div className="hostContainer">
        <h1>Events-History</h1>
        <hr />
        <div className="options" style={{ marginRight: 100 }}>
          <div className="dropdown">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                id="eventsDropDown"
              >
                Events
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Club
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Sports
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Webinar
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Seminar
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Cultural/Festival
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Other
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div className="hostEvents">
            <button className="btn btn-primary btn-lg">Create Event</button>
          </div>
        </div>

        <section
          style={{
            height: 400,
            marginTop: 100,
            marginRight: 100,
          }}
        >
          <div
            className="table"
            style={{ height: 70, backgroundColor: "#5b5b5b" }}
          >
            <div className="table-items">
              <div className="table-item">Events</div>
              <div className="table-item">Date</div>
              <div className="table-item">Time</div>
              <div className="table-item">Status</div>
            </div>
          </div>
          <div className="eventsTable">
            <a href="/">
            <div className="table-items">
              <div className="table-item">data1</div>
              <div className="table-item">data2</div>
              <div className="table-item">data3</div>
              <div className="table-item">data4</div>
            </div>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export default EventHistory;
