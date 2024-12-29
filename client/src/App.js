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
import UserDetails from "./components/UserDetails";
import Register from "./components/Register";
import ManageEvents from "./components/ManageEvents";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";



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
                path="/profile/user-details"
                element={
                  !isAuthenticated ? <Login setAuth={setAuth} /> : <UserDetails />
                }
              ></Route>
              <Route exact path="/profile/user-details" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <UserDetails/>} />
              <Route exact path="/profile/host-event" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <Eventhost />}></Route>
              <Route exact path="/profile/manage-my-events" element={!isAuthenticated ? <Login setAuth={setAuth}/> :<ManageEvents/>}/>
              <Route exact path="/profile/change-password" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <ChangePassword/>}/>
              <Route exact path="/profile/delete-account" element={!isAuthenticated ? <Login setAuth={setAuth}/> : <DeleteAccount/>}/>
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
              <Route exact path="/register" element={<Register/>} />
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
