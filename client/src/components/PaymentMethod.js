import React , {useState} from "react";

function PaymentMethod() {

    const [paymentVisibility, setPaymentVisibility] = useState(false);
  return (
    <>
      <div
        className="container"
        style={{
          paddingTop: 70,
          height: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginTop: "5rem", fontFamily : "Neue Plak"}}>
          Payment Method
        </h1>
        <div
          className="container d-flex"
          style={{ alignItems: "center", justifyContent: "center"}}
        >
          <div className="card" style={{ width: "27rem", height: "18rem" }} id="payment-card">
            <div className="card-body">
              <h4 className="card-title" >Choose Payment Method</h4>
              <h6 className="card-sub-title" style={{opacity : 0.6}}>
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
                  <button className="btn btn-outline-success my-2">Pay with Esewa</button>
                  <button className="btn btn-outline-primary my-2">Pay with Khalti</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentMethod;
