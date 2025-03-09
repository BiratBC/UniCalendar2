import { useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
function SuccessPayment() {
  const [searchParams] = useSearchParams();
  const { userId, eventId } = useParams();

  useEffect(() => {
    const verifyPayment = async () => {
      // const transactionDetails = Object.fromEntries(searchParams);

      const encodedData = searchParams.get("data");
      if (!encodedData) {
        console.error("Missing transaction details from esewa");
        return;
      }

      const decodedData = atob(encodedData);
      // console.log("Decoded data : ", decodedData);

      const transactionDetails = JSON.parse(decodedData);

      const productId = transactionDetails.product_code;

      const userDetails = {
        firstName: searchParams.get("userFirstName"),
        lastName: searchParams.get("userLastName"),
        contactNumber: searchParams.get("userContactNumber"),
        email: searchParams.get("userEmail"),
      };

      try {
        console.log(
          "🔍 Transaction Details Sent to Backend:",
          transactionDetails
        );

        const response = await fetch(
          "http://localhost:5000/payment/esewa/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transactionDetails, userId, eventId }),
          }
        );

        const data = await response.json();
        // console.log("Esewa response : ", data);
        // console.log("User details from :",userDetails);
        
        // if (data.success) {
        //   console.log("Payment verification successful.");
        //   await addParticipant(eventId, userDetails, transactionDetails);
        // }
      } catch (error) {
        console.error("Payment verification error:", error);
      }
    };

    verifyPayment();
  }, []);

  return (
    <>
      <div className="container" style={{height : "100vh", display : "flex", justifyContent : "center", alignItems : "center"}}>
        <div className="success-container">
          <div className="icon-success">
            <img src="/check.png" alt="check" height={70}/>
          </div>
          <div className="message-success">
            <h1 className="text-center mb-3 mt-2">Success!</h1>
            <h2 className="m-0 text-center">You are successfully registered for the event.</h2>
            <p className="mb-4 text-center" style={{color : "gray"}}>You'll receive a confirmation email shortly</p>
          </div>
          <div className="return-button">
            <Link className="btn btn-primary" to="/">Return</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default SuccessPayment;
