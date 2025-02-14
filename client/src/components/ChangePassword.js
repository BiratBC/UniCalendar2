import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Profile";
import {toast} from "react-toastify";

function ChangePassword() {
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeInputs = (e) => {
    const {name , value} = e.target;
    setInputs({ ...inputs, [name]:value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (inputs.newPassword !== inputs.confirmPassword) {
      toast.error("New password and confirm password didnt match");
    }

    try {
      const jwtToken = localStorage.getItem("token");
      if (!jwtToken) {
        console.log("Token not available");
        
      }
      console.log(inputs);
      
      const response = await fetch("http://localhost:5000/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(inputs),
        }
      );
      if (response.ok) {
        toast.success("Password changed successfully");
      }

    } catch (error) {
      console.error(error.message);
      
    }
  };

  return (
    <>
      <Dashboard />
      <div className="containerforRegister">
        <div className="registerForm">
          <h1>Change your Password</h1>

          <form action="" id="changePasswordForm" onSubmit={onSubmitForm}>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="oldPassword"
                placeholder="Old Password"
                name="oldPassword"
                onChange={onChangeInputs}
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="newPassword"
                placeholder="New Password"
                name="newPassword"
                onChange={onChangeInputs}
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={onChangeInputs}
              />
            </div>
            <div className="passwordCriteria">
              <ul>
                <li>One Number</li>
                <li>One Lowercase character</li>
                <li>One Uppercase character</li>
                <li>8 characeters minimum</li>
              </ul>
            </div>
            <div className="submitBtn">
              <button className="btn btn-success">Change Password</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
