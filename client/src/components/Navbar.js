import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";
import NotificationBox from "./NotificationBox";

export default function Navbar(props) {
  const navigate = useNavigate();
  //getName
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);

  async function getName() {

    const jwtToken = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/profile/userDetails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (response.ok) {
        setName(parseRes.first_name); // Set the user name in state
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

  // Control SearchList Box visibility
  const [isVisible, setIsVisible] = useState(true);
  const boxRef = useRef(null);
  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (props.isAuthenticated) {
      getName();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener
    };
  }, [props.isAuthenticated]);

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
              <div className="search">
                <SearchBar
                  setResults={setResults}
                  setIsVisible={setIsVisible}
                />
              </div>
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
                    <Link
                      className="dropdown-item"
                      to="/event/type/Cultural-Festival"
                    >
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
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div className="position-relative">
                      {/* <i
                        className="fa fa-bell"
                        aria-hidden="true"
                        style={{
                          fontSize: 22,
                          color: "black",
                          cursor: "pointer",
                        }}
                      />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        9
                        <span className="visually-hidden">unread messages</span>
                      </span> */}
                      <NotificationBox />
                    </div>
                  </li>
                  <li id="right-dropdown" className="nav-item dropdown flex">
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
                        style={{
                          fontSize: 24,
                        }}
                      ></i>
                      {/* <span>{name}</span> */}
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
                        <a
                          className="dropdown-item"
                          href="/profile/manage-my-events"
                        >
                          Your Events
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          FAQs
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/">
                          Terms & Conditions
                        </a>
                      </li>
                      <li id="logoutBtn">
                        <a href="/">
                          <button
                            className="btn btn-danger"
                            onClick={logout}
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
              {/* <li
                className="nav-item"
                style={{ display: "flex", alignItems: "center" }}
              >
                <a className="nav-link active" aria-current="page" href="/">
                  Join Team
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <SearchResultsList
        results={results}
        isVisible={isVisible}
        boxRef={boxRef}
      />
    </>
  );
}
