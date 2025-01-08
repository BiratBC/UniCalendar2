import React, { useState } from "react";
// import google from "../images/google.png";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Register() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = async (res) => {
    console.log("Login Successful!", res);
    
  };

  const handleLoginError = (res) => {
    console.log("Login Fail!", res);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (checkConfirmPassword()) {
        const body = { firstName, lastName, email, phoneNumber, password };
        const response = await fetch("http://localhost:5000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          toast.success("Account created successfully");
          <Navigate to="/login" />;
        } else {
          const errorText = await response.text();
          if (response.status === 401) {
            toast.error(errorText);
          } else {
            toast.error("Error! Please try again later");
          }
        }
      } else {
        toast.error("Password didn't match");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkConfirmPassword = () => {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  // const CLIENT_ID ="903332596957-sd9i97j8qlmjjhhd547bam8ce5jtkpcr.apps.googleusercontent.com";
  return (
    <>
      <div className="containerforRegister">
        <div className="registerForm">
          <h1>Create Account</h1>

          <div className="rows">
            <div className="signInButton" style={{ width: "100%" }}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
              ></GoogleLogin>
            </div>
          </div>

          <form action="" onSubmit={onSubmitForm}>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
                type="text"
                className="firstName"
                style={{ marginRight: 7 }}
                placeholder="First Name"
                required
              />
              <input
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
                type="text"
                className="lastName"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-envelope"></i>
                </span>
              </div>
              <input
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                type="email"
                className="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-user"></i>
                </span>
              </div>
              <input
                name="countryCode"
                onChange={(e) => onChange(e)}
                type="number"
                className="countryCode"
                style={{ marginRight: 7 }}
                placeholder="+977"
                required
              />
              <input
                name="phoneNumber"
                onChange={(e) => onChange(e)}
                value={phoneNumber}
                type="number"
                className="phoneNumber"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>

              <input
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
                type="text"
                className="password"
                style={{ marginRight: 7 }}
                placeholder="Password"
                required
              />
              <input
                name="confirmPassword"
                onChange={(e) => onChange(e)}
                value={confirmPassword}
                type="text"
                className="confirmPassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="submitBtn">
              <button className="btn btn-success">Sign up</button>
            </div>
            <p>Have an account?</p>
            <div className="backToLogin">
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
