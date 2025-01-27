const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const crypto = require("crypto");

async function generateEsewaHash({ amount, event_id }) {
  try {
    const data = `total_amount=${amount},transaction_uuid=${event_id},product_code=${process.env.ESEWA_PRODUCT_CODE}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };
  } catch (error) {
    console.error(error.message);
  }
}

async function verifyEsewaPayment(encodedData) {
  try {
    // decoding base64 code revieved from esewa
    let decodedData = atob(encodedData);
    decodedData = await JSON.parse(decodedData);
    let headersList = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    const secretKey = process.env.ESEWA_SECRET_KEY;
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    console.log(hash);
    console.log(decodedData.signature);

    if (hash !== decodedData.signature) {
      throw { message: "Invalid Info", decodedData };
    }
    const reqOptions = {
      method: "GET",
      headers: headersList,
    };

    const url = `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`;

    let response = await fetch(url, reqOptions);
    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw { message: "Invalid Info", decodedData };
    }
    return { response: response.data, decodedData };
  } catch (error) {
    throw error;
  }
}

router.post("/payment-with-esewa", authorization, async (req, res) => {
  try {
    const user_id = req.user;
    const { eventId } = req.params;
    const {firstName, lastName, contactNumber, email, teamName, paymentStatus, eventFee} = req.body;
    const addParticipant = await pool.query(
        "INSERT INTO event_participant (event_id, user_id, participant_first_name, participant_last_name, participant_contact, participant_email, participant_team_name, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
        [
          eventId,
          user_id,
          firstName,
          lastName,
          contactNumber,
          email,
          teamName,
          paymentStatus
        ]
      );
      res.status(200).json({
        message : "Registered successfully"
      })
    // Initiate payment with eSewa
    const paymentInitiate = await getEsewaPaymentHash({
      amount: eventFee,
      transaction_uuid: eventId,
    });

    // Respond with payment details
    res.json({
      success: true,
      payment: paymentInitiate,
      purchasedItemData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
