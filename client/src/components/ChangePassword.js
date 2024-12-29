import React from 'react'
import {Link} from 'react-router-dom';
import Dashboard from './Profile';

function ChangePassword() {
  return (
    <>
    <Dashboard/>
    <div className="containerforRegister">
        <div className="registerForm">
          <h1>Change your Password</h1>

          <form action="" id='changePasswordForm'>
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
              />
            </div>
            <div className="rows">
              <div className="icons">
                <span>
                  <i className="fa fa-lock"></i>
                </span>
              </div>
              <input type="password" className="newPassword" placeholder="New Password" />
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
  )
}

export default ChangePassword
