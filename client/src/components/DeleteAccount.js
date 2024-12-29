import React from 'react'
import Dashboard from './Profile';

function DeleteAccount() {
  return (
    <>
        <Dashboard/>
        <div className="containerforRegister">
            <div className="registerForm">
              <h1>Delete your account</h1>
    
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
                    placeholder="Confirm Password*"
                  />
                </div>
                  <p style={{color : 'gray'}}>Enter your current password to confirm cancellation of your account</p>

                <div className="submitBtn">
                <button className="btn btn-danger border rounded-pill">Delete account</button>
                </div>
              </form>
            </div>
          </div>
        </>
  )
}

export default DeleteAccount
