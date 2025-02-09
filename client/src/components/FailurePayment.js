import React from 'react'
import { Link } from 'react-router-dom'

const FailurePayment = () => {
  return (
    <>
    <div className="container" style={{height : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
        <div className="failure-container">
          <div className="icon-failure">
            <img src="/fail.png" alt="check" height={70}/>
          </div>
          <div className="message-failure">
            <h1 className="text-center mb-3 mt-2">Failed!</h1>
            <h2 className="m-0 text-center">Sorry! the registration failed. Please try again later</h2>
            <p className="mb-4 text-center" style={{color : "gray"}}>Unable to register due to payment failure.</p>
          </div>
          <div className="return-button">
            <Link className="btn btn-primary" to="/">Return</Link>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default FailurePayment
