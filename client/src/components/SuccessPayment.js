import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { addParticipant } from "../utils/addParticipant";

function SuccessPayment() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const transactionDetails = Object.fromEntries(searchParams);
      const productId = transactionDetails.product_code;

      const userDetails = {
        firstName: searchParams.get("userFirstName"),
        lastName: searchParams.get("userLastName"),
        contactNumber: searchParams.get("userContactNumber"),
        email: searchParams.get("userEmail"),
      };
      
      try {
        const response = await fetch(
          "http://localhost:5000/payment/esewa/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transactionDetails),
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log("Payment verification successful.");
          await addParticipant(productId,userDetails,transactionDetails);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
      }
    };

    verifyPayment();
  }, []);

  return <h1>Payment Successful</h1>;
}
export default SuccessPayment;