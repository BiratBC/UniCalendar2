export const addParticipant = async (productId, userDetails, transactionDetails) => {
    try {
      const response = await fetch(`http://localhost:5000/event/register/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          contactNumber: userDetails.contactNumber,
          email: userDetails.email,
          status: transactionDetails.status,
        }),
      });
  
      const parseData = await response.json();
      if (response.ok) {
        console.log("✅ Participant added successfully");
      } else {
        console.error("❌ Failed to add participant:", parseData);
      }
    } catch (error) {
      console.error("❌ Error adding participant:", error.message);
    }
  };