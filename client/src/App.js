import "./App.css";
//Components
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Profile";
import Eventhost from "./components/Eventhost";
import Event from "./components/Event";
import EventInfo from "./components/EventInfo";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import EventStatus from "./components/EventStatus";
import Footer from "./components/Footer";
function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (userDetails) => {
    setUser(userDetails);
  };
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar user={user} />
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
              element={!user && <Login onLogin={handleLogin} />}
            ></Route>
            <Route exact path="/profile" element={<Dashboard />}></Route>
            <Route exact path="/host" element={<Eventhost />}></Route>
            <Route exact path="/events/:eventId" element={<EventInfo/>}></Route>
            <Route exact path="/events/status/:eventStatus" element = {<EventStatus/>}></Route>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
