import React from "react";
import Dashboard from "./Profile";

function ManageEvents() {
  return (
    <>
      <Dashboard />
      <div className="hostContainer">
        <h1>Manage my events</h1>
        <hr />
        <div className="options" style={{ marginRight: 100 }}>
          <div className="dropdown">
            <select class="form-select h-100" aria-label="Default select example">
              <option selected>All</option>
              <option value="1">Upcoming</option>
              <option value="2">Ongoing</option>
              <option value="3">Completed</option>
            </select>
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

export default ManageEvents;
