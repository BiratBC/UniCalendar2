import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";

export default function Navbar(props) {
  const navigate = useNavigate();
  //getName
  const [name, setName] = useState("");
  const CLIENT_ID = "903332596957-sd9i97j8qlmjjhhd547bam8ce5jtkpcr.apps.googleusercontent.com";

  //google logout success button

  const onSuccess = () => {
    console.log("Successfully logout");
    
  }

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      // console.log("parseress", parseRes);

      if (response.ok) {
        setName(parseRes.user_name); // Set the user name in state
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    props.setAuth(false);
    toast.success("Logout successfully");
    navigate("/");
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      getName();
    }
  }, [props.isAuthenticated]);

  // const setAuth = false;

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ height: 70 }}
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
                    <Link className="dropdown-item" to="/event/type/Workshop">
                      Workshop
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Club">
                      Club
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Sports">
                      Sports
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Webinar">
                      Webinar
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Seminar">
                      Seminar
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Cultural-Festival">
                      Cultural/Festival
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/event/type/Other">
                      Other
                    </Link>
                  </li>
                </ul>
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
              {props.isAuthenticated ? (
                <>
                  <li
                    className="nav-item"
                    style={{
                      paddingTop: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <a className="position-relative" href="/">
                      <i
                        className="fa fa-bell"
                        aria-hidden="true"
                        style={{
                          fontSize: 22,
                          color: "black",
                          cursor: "pointer",
                        }}
                      />
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span class="visually-hidden">unread messages</span>
                      </span>
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
                      <span>{name}</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="dropdown-item"
                          type="submit"
                          to="/profile/user-details"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Your Events
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Help & Support
                        </a>
                      </li>
                      <li id="logoutBtn">
                        <a href="/">
                          <googleLogout
                            className="btn btn-danger"
                            onClick={logout}
                            type="submit"
                            href="/"
                            clientId = {CLIENT_ID}
                            onLogoutSuccess={onSuccess}
                          >
                            Log out
                          </googleLogout>
                        </a>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      className="btn btn-outline-success"
                      type="submit"
                      to="/register"
                    >
                      Sign up
                    </Link>
                  </li>
                  <li>
                    <Link className="btn btn-success" type="submit" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  to="/about-us"
                  className="nav-link active"
                  aria-current="page"
                >
                  About
                </Link>
              </li>
              <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  to="/contact-us"
                  className="nav-link active"
                  aria-current="page"
                >
                  Contact us
                </Link>
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
