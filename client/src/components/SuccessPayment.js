import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { addParticipant } from "../utils/addParticipant";

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
      console.log("Decoded data : ", decodedData);

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
        console.log("Esewa response : ", data);

        if (data.success) {
          console.log("Payment verification successful.");
          await addParticipant(productId, userDetails, transactionDetails);
        }
      } catch (error) {
        console.error("Payment verification error:", error);
      }
    };

    verifyPayment();
  }, []);

  return <h1 style={{ marginTop: 100 }}>Payment Successfull</h1>;
}
export default SuccessPayment;
