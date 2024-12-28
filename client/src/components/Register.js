import React from "react";
import google from '../images/google.png'
import {Link} from 'react-router-dom';

function Register() {
  return (
    <>
      <div className="containerforRegister">
        <div className="registerForm">
          <h1>Create Account</h1>

          <div className="rows">
            <button className="btn btn-primary" style={{display: "flex"}}>
              <div className="icons" >
                  <img src={google} alt=""></img>
              </div>
              <p>Sign up with Google</p>
            </button>
          </div>

          <form action="">
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                className="firstName"
                style={{ marginRight: 7 }}
                placeholder="First Name"
              />
              <input type="text" className="lastName" placeholder="Last Name" />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input type="email" className="email" placeholder="Email" />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                type="number"
                className="countryCode"
                style={{ marginRight: 7 }}
                placeholder="+977"
              />
              <input
                type="number"
                className="phoneNumber"
                placeholder="Phone Number"
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <input
                type="text"
                className="password"
                style={{ marginRight: 7 }}
                placeholder="Password"
              />
              <input
                type="text"
                className="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            <div className="submitBtn">
            <button className="btn btn-success">Sign up</button>
            </div>
            <div className="backToLogin">
                <p>Have an account?</p>
                <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
