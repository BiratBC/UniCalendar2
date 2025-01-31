import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function PaymentMethod() {
  const [searchParams] = useSearchParams();
  const amount = searchParams.get("amount");
  const eventId = searchParams.get("productId");
  const user_id = searchParams.get("userId");
  const [message, setMessage] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [userDetails, setUserDetails] = useState({
    firstName : searchParams.get("userFirstName"),
    lastName : searchParams.get("userLastName"),
    contactNumber : searchParams.get("userContactNumber"),
    email : searchParams.get("userEmail"),
  })


  // const addPartitcipant = async (transactionDetails) => {
  //   try {

  //     const response = await fetch(`http://localhost:5000/event/register/${productId}`,
  //       {
  //         method : "POST",
  //         headers : {
  //           "Content-Type" : "application/json"
  //         },
  //         body : JSON.stringify({
  //           firstName : userDetails.firstName,
  //           lastName : userDetails.lastName,
  //           contactNumber : userDetails.contactNumber,
  //           email : userDetails.email,
  //           status : transactionDetails.status
  //         })
  //       }
  //     )

  //     const parseData = await response.json();
  //     if (response.ok) {
  //       console.log("Participant added successfully");
        
  //     }
      
  //   } catch (error) {
  //     console.error(error.message);
      
  //   }
  // }


  const handlePaymentSuccess = async (transactionDetails) => {
    const userId = user_id;
    // const eventId = eventId;

    try {
      const response = await fetch(
        "http://localhost:5000/payment/esewa/verify",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            event_id: eventId,
            transaction_code: transactionDetails.transaction_code,
            status: transactionDetails.status,
            total_amount: transactionDetails.total_amount,
            transaction_uuid: transactionDetails.transaction_uuid,
            product_code: transactionDetails.product_code,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Payment verification and user data added successfully.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEsewaPayment = async (e) => {
    e.preventDefault(); // Prevent form submission
    if (!amount || !eventId) {
      setMessage("Please enter amount and product ID.");
      return;
    }

    try {
      // console.log("Request Payload:", { amount, productId });
      const response = await fetch("http://localhost:5000/payment/esewa/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, eventId, user_id }),
      });

      const data = await response.json();
      setPaymentDetails(data.payload);

      // console.log("eSewa Response:", data);
      // console.log("Signature:", data.payload?.signature);
      // console.log("Full Payload:", data.payload);

      if (data.payload) {
        //creating a form to directly submit if payload matches
        const formData = new FormData();
        Object.entries(data.payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        console.log("Form Data to be submitted:", Object.fromEntries(formData));

        // Create and submit form
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", data.esewaUrl);

        Object.entries(data.payload).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.setAttribute("type", "hidden");
          input.setAttribute("name", key);
          input.setAttribute("value", value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
      } else {
        setMessage("Failed to initiate payment.");
      }

      console.log(`Data Payload : ${data.payload}`);
      

      // if (data.status === "COMPLETE") {
      //   await handlePaymentSuccess(data.payload);
      //   // addPartitcipant(data.payload);
      // } else {
      //   setMessage("Payment was not successful.");
      // }
    } catch (error) {
      console.error("Payment Error:", error);
      setMessage("Error initiating payment.");
    }
  };
  
  return (
    <>
      <div
        className="container"
        style={{
          paddingTop: 70,
          height: "100vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: "5rem",
            fontFamily: "Neue Plak",
          }}
        >
          Payment Method
        </h1>
        <div
          className="container d-flex"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div
            className="card"
            style={{ width: "27rem", height: "18rem" }}
            id="payment-card"
          >
            <div className="card-body">
              <h4 className="card-title">Choose Payment Method</h4>
              <h6 className="card-sub-title" style={{ opacity: 0.6 }}>
                Select your preferred payment option
              </h6>
              <div
                className="paymentBtns d-flex"
                style={{
                  flexDirection: "column",
                  gap: "2rem",
                  marginTop: "2rem",
                }}
              >
                {/* <div className="container">
                  {userDetails.firstName}
                </div> */}
                <button
                  className="btn btn-outline-success my-2"
                  onClick={handleEsewaPayment}
                  type="submit"
                >
                  Pay with Esewa
                </button>
                {message && <p>{message}</p>}
                <button className="btn btn-outline-primary my-2">
                  Pay with Khalti
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentMethod;
