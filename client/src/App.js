import "./App.css";
//Components
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Profile";
import Eventhost from "./components/Eventhost";
import Event from "./components/Event";
import EventInfo from "./components/EventInfo";
import About from "./components/About";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Register from "./components/Register";

import {
  useLocation,
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventStatus from "./components/EventStatus";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import EventHistory from "./components/EventHistory";

const Wrapper = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  return children;
};

function App() {
  //Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      // console.log("Token in Local Storage:", localStorage.token);

      const parseRes = await response.json();
      // console.log(parseRes);
      // console.log("isAuthenticated:", isAuthenticated);
      // console.log("setIsAuthenticated function:", setIsAuthenticated);

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Navbar
          setAuth={setIsAuthenticated}
          isAuthenticated={isAuthenticated}
        />
        <div>
          <Wrapper>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <div className="" style={{ marginTop: "5.7rem" }}>
                    <Event />
                    <Footer />
                  </div>
                }
              ></Route>
              <Route
                exact
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              ></Route>
              <Route
                exact
                path="/profile"
                element={
                  !isAuthenticated ? <Login setAuth={setAuth} /> : <Dashboard />
                }
              ></Route>
              <Route exact path="/host" element={<Eventhost />}></Route>
              <Route exact path="/event-history" element={<EventHistory />} />
              <Route
                exact
                path="/events/:eventId"
                element={<EventInfo />}
              ></Route>
              <Route
                exact
                path="/events/status/:eventStatus"
                element={<EventStatus />}
              ></Route>
              <Route exact path="/about-us" element={<About />}></Route>
              <Route exact path="/contact-us" element={<Contact />} />
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
