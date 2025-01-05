import React, {useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";

export default function Profile(props) {
  const location = useLocation();
    const [active, setActive] = useState("userDetails");

    // const handleButtonClick = (id, event) => {
    //   // event.preventDefault();
    //   setActive(id);
    // };

    //get userName
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method : "GET",
                headers : {token : localStorage.token}
            });

            const parseRes = await response.json();
            // console.log(parseRes);
            setName(parseRes.user_name);
            setName(parseRes.user_name);

        } catch (error) {
            console.error(error.message);
            
        }
    }
    useEffect(() => {
      getName(); //harek render ma yo run huncha
      setActive(location.pathname)
  },[location]);


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
                  className="list-group-item list-group-item-action py-2 ripple"
                  aria-current="true"
                  style={{fontSize : 35, fontFamily : 'Ubuntu'}}
                >
                  <span>Profile</span>
                  {/* <span><img className= "mx-5" src="down-arrow.png" alt="img" style={{width :30, height: 30}}/></span> */}
                </Link>
                <Link
                  to="/profile/user-details"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "/profile/user-details" ? "active" : ""
                  }`}
                  // onClick={() => handleButtonClick("userDetails")}
                >
                  <i className="fa fa-user fa-fw me-3"></i>
                  <span>User Details</span>
                </Link>
                <Link
                  to="/profile/host-event"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "/profile/host-event" ? "active" : ""
                  }`}
                  // onClick={() => handleButtonClick("hostEvent")}
                >
                  <i className="fa fa-calendar fa-fw me-3"></i>
                  <span>Host Event</span>
                </Link> 
                <Link
                  to="/profile/manage-my-events"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "/profile/manage-my-events" ? "active" : ""
                  }`}

                  // onClick={() => handleButtonClick("manageEvents")}
                >
                  <i className="	fa fa-wrench fa-fw me-3"></i>
                  <span>Manage My Events</span>
                </Link>
                <Link
                  to="/profile/change-password"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "/profile/change-password" ? "active" : ""
                  }`}

                  // onClick={() => handleButtonClick("changePassword")}
                >
                  <i className="fa fa-lock fa-fw me-3"></i>
                  <span>Change Password</span>
                </Link>
                <Link
                  to="/profile/delete-account"
                  className={`list-group-item list-group-item-action py-2 ripple ${
                    active === "/profile/delete-account" ? "active" : ""
                  }`}

                  // onClick={() => handleButtonClick("deleteAccount")}
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
