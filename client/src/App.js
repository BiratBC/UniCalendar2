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
import LoadingBar from "react-top-loading-bar";
import EventType from "./components/EventType";
import RegisterEvent from "./components/RegisterEvent";
import EventDetails from "./components/EventDetails";
import PaymentMethod from "./components/PaymentMethod";
import SuccessPayment from "./components/SuccessPayment";
import FailurePayment from "./components/FailurePayment";
import HostDetails from "./components/HostDetails";
import RegisteredEvents from "./components/RegisteredEvents";

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
  const [progress, setProgress] = useState(0);

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

  const GOOGLE_CLIENT_ID =
    "903332596957-sd9i97j8qlmjjhhd547bam8ce5jtkpcr.apps.googleusercontent.com";

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
        <LoadingBar height={5} color="#f11946" progress={progress} />
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
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <UserDetails />
                  )
                }
              ></Route>
              <Route
                exact
                path="/profile/user-details"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <UserDetails />
                  )
                }
              />
              <Route
                exact
                path="/profile/host-event"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <Eventhost setProgress={setProgress} />
                  )
                }
              ></Route>
              <Route
                exact
                path="/profile/manage-my-events"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <ManageEvents />
                  )
                }
              />
              <Route
                exact
                path="/profile/registered-events"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <RegisteredEvents />
                  )
                }
              />
              <Route
                exact
                path="/profile/change-password"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <ChangePassword />
                  )
                }
              />
              <Route
                exact
                path="/profile/delete-account"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <DeleteAccount />
                  )
                }
              />
              <Route exact path="/event/type" element={<EventType />} />
              <Route
                exact
                path="/profile/manage-my-events/:eventId"
                element={<EventInfo />}
              ></Route>
              <Route
                exact
                path="/events/status/:eventStatus"
                element={<EventStatus />}
              ></Route>
              <Route exact path="/about-us" element={<About />}></Route>
              <Route exact path="/contact-us" element={<Contact />} />
              <Route exact path="/register" element={<Register />} />
              <Route
                exact
                path="/event/register/:eventId"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <RegisterEvent />
                  )
                }
              />
              <Route exact path="/event/type/:type" element={<EventType />} />
              <Route exact path="/events/:eventId" element={<EventDetails />} />
              <Route exact path="/payment-method" element={<PaymentMethod />} />
              <Route
                exact
                path="/esewa/payment-success/:eventId/:userId"
                element={<SuccessPayment />}
              />
              <Route
                exact
                path="/esewa/payment-failure"
                element={<FailurePayment />}
              />
              <Route
                exact
                path="/host-detail/:hostId"
                element={<HostDetails />}
              />
            </Routes>
          </Wrapper>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
