import React, { useState } from "react";
import {Link} from "react-router-dom";

export default function Navbar({user}) {
  // const [user, setUser] = useState(null);

  // const handleLogin = () => {
  //   setUser({
  //     name: "Birat",
  //   });
  //   console.log(user);
  // };
  const [userVar, setUser] = useState(null);  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ height: 70}}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              className=""
              src="/unical-removebg-preview.png"
              alt=""
              style={{ width: 85, height: 60 }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2 mx-2"
                  type="search"
                  placeholder="Search Events"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
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
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  aria-disabled="true"
                  href="/"
                  style={{}}
                >
                  Disabled
                </a>
              </li>
            </ul>
            <ul
              style={{
                padding: 0,
                display: "flex",
                margin: 4,
                listStyle: "none",
                gap: 20,
              }}
            >
              {user ? (
                <>
                  <li
                    className="nav-item"
                    style={{
                      paddingTop : 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a href="/">
                      <i
                        className="fa fa-bell"
                        aria-hidden="true"
                        style={{
                          fontSize: 22,
                          color: "black",
                          cursor: "pointer",
                        }}
                      ></i>
                    </a>
                  </li>
                  <li id="right-dropdown" className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i
                        className="fa fa-user mx-2"
                        aria-hidden="true"
                        style={{ fontSize: 25 }}
                      ></i>
                      <span>{user.name}</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item"
                              type="submit"
                              to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li >
                        <a className="dropdown-item" href="/">
                          Your Events
                        </a>
                      </li>
                      <li >
                        <a className="dropdown-item" href="/">
                          Help & Support
                        </a>
                      </li>
                      <li id="logoutBtn">
                        <a href="/">
                          <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                            type="submit"
                            href="/"
                          >
                            Log out
                          </button>
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="btn btn-outline-success" type="submit">
                      Sign up
                    </button>
                  </li>
                  <li>
                    <Link
                      className="btn btn-success"
                      type="submit"
                      to = "/login"
                    >
                      Login                      
                    </Link>
                  </li>
                </>
              )}
              <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <a className="nav-link active" aria-current="page" href="/">
                  About
                </a>
              </li>
              <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <a className="nav-link active" aria-current="page" href="/">
                  Contact us
                </a>
              </li>
              <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <a className="nav-link active" aria-current="page" href="/">
                  Join Team
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
