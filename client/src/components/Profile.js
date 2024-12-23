import React, {useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function Profile(props) {
    const [active, setActive] = useState("userDetails");

    const handleButtonClick = (id, event) => {
      setActive(id);
      // event.preventDefault();
    };

    //get userName
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method : "GET",
                headers : {token : localStorage.token}
            });

            const parseRes = await response.json();
            console.log(parseRes);
            setName(parseRes.user_name);
            setName(parseRes.user_name);

        } catch (error) {
            console.error(error.message);
            
        }
    }
    useEffect(() => {
      getName(); //harek render ma yo run huncha
  },[]);


  return (
    <>
      <div>
        <header>
          <nav
            id="sidebarMenu"
            className="collapse d-lg-block sidebar collapse bg-white"
            // style={{position : "fixed"}}
            style={{overflowY:"scroll", scrollbarGutter : "stable", scrollbarWidth : "thin"}}
            
          >
            <div className="position-sticky" >
              <div className="list-group list-group-flush mx-3 mt-4"  >
                <Link
                  to="/profile"
                  className="list-group-item list-group-item-action py-2 ripple"
                  onClick={(event) => {event.preventDefault()}}
                  aria-current="true"
                  style={{fontSize : 35, fontFamily : 'Ubuntu'}}
                >
                  <span>Profile</span>
                  {/* <span><img className= "mx-5" src="down-arrow.png" alt="img" style={{width :30, height: 30}}/></span> */}
                </Link>
                <Link
                  to="/profile"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "userDetails" ? "active" : ""
                  }`}
                  onClick={(event) => handleButtonClick("userDetails",event)}
                >
                  <i className="fa fa-user fa-fw me-3"></i>
                  <span>User Details</span>
                </Link>
                <Link
                  to="/host"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "hostEvent" ? "active" : ""
                  }`}
                  onClick={(event) => handleButtonClick("hostEvent", event)}
                >
                  <i className="fa fa-calendar fa-fw me-3"></i>
                  <span>Host Event</span>
                </Link> 
                <Link
                  to="/event-history"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "eventHistory" ? "active" : ""
                  }`}

                  onClick={(event) => handleButtonClick("eventHistory",event)}
                >
                  <i className="fa fa-history fa-fw me-3"></i>
                  <span>Event History</span>
                </Link>
                <Link
                  to="/profile"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "manageEvents" ? "active" : ""
                  }`}

                  onClick={(event) => handleButtonClick("manageEvents", event)}
                >
                  <i className="	fa fa-wrench fa-fw me-3"></i>
                  <span>Manage My Events</span>
                </Link>
                <Link
                  to="/profile"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "changePassword" ? "active" : ""
                  }`}

                  onClick={(event) => handleButtonClick("changePassword", event)}
                >
                  <i className="fa fa-lock fa-fw me-3"></i>
                  <span>Change Password</span>
                </Link>
                <Link
                  to="/profile"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "deleteAccount" ? "active" : ""
                  }`}

                  onClick={(event) => handleButtonClick("deleteAccount", event)}
                >
                  <i className="fa fa-user-times fa-fw me-3"></i>
                  <span>Delete Account</span>
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main style={{ marginTop: 58 }}>
          <div className="container pt-4"></div>
        </main>
      </div>
    </>
  );
}
