import React, { useState } from "react";
// import google from "../images/google.png";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        console.log(response);

        if (response.ok) {
          toast.success("Account created successfully");
          window.location.href = '/auth/login'
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
  return (
    <>
      <div className="containerforRegister">
      <div className="" style={{ width: "50%" }}>
              <img
                src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148567979.jpg?t=st=1741118348~exp=1741121948~hmac=0b7539165ae7f0aa6350e04aad450977b78cdd3aeb5a9a8c12b8f02f164d6fee&w=900"
                alt=""
                width={510}
              />
            </div>
        <div className="registerForm">
          <h1 style={{fontFamily : 'Work Sans Medium'}}>Sign up to UniCalendar</h1>
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
            <p className="text-center">Have an account?</p>
            <div className="backToLogin">
              <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
