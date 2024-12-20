import "./App.css";
//Components
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Profile";
import Eventhost from "./components/Eventhost";
import Event from "./components/Event";
import EventInfo from "./components/EventInfo";
// import Dashboard from "./components/Dashboard";
// import Login from "./components/Login";
// import Register from "./components/Register";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventStatus from "./components/EventStatus";
import Footer from "./components/Footer";
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
      console.log("Token in Local Storage:", localStorage.token);


      const parseRes = await response.json();
      console.log(parseRes);

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
        <Navbar setAuth = {setAuth} isAuthenticated = {isAuthenticated}/>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <div className="" style={{ marginTop: "5.7rem" }}>
                  <Event />
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
                 <Navigate to="/profile" />
               )
             }
            ></Route>
            <Route exact path="/profile" element={!isAuthenticated ? <Login/> : <Dashboard />}></Route>
            <Route exact path="/host" element={<Eventhost />}></Route>
            <Route exact path="/events/:eventId" element={<EventInfo/>}></Route>
            <Route exact path="/events/status/:eventStatus" element = {<EventStatus/>}></Route>
          </Routes>
        {/* <Footer/> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
