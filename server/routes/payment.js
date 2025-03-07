const router = require("express").Router();
const { query } = require("express");
const pool = require("../db");
const authorization = require("../middleware/authorization");
// const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const uuidv4 = require("uuid").v4;
const { addNotification } = require("../utils/addNotification");

const MERCHANT_CODE = "EPAYTEST";
const ESEWA_SECRET_KEY = "8gBm/:&EnhH.1/q";
const BASE_URL = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

function generateEsewaSignature(secretKey, message) {
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  return CryptoJS.enc.Base64.stringify(hash);
}

router.post("/esewa/pay", async (req, res) => {
  const { amount, eventId, user_id } = await req.body;
  let encodedData;
  // const user_id = req.user;
  if (!amount || !eventId || !user_id) {
    return res
      .status(400)
      .json({ message: "Amount ,Event ID or userId required" });
  }
  try {
    const transactionUuid = `${Date.now()}-${uuidv4()}`;

    const payload = {
      amount: amount.toString(),
      total_amount: amount.toString(),
      transaction_uuid: transactionUuid,
      product_code: MERCHANT_CODE.toString(),
      product_service_charge: "0",
      product_delivery_charge: "0",
      tax_amount: "0",
      success_url: `http://localhost:3000/esewa/payment-success/${eventId}/${user_id}/`,
      failure_url: "http://localhost:3000/esewa/payment-failure/",
      signed_field_names: "total_amount,transaction_uuid,product_code",
    };

    const signatureString = `total_amount=${payload.total_amount},transaction_uuid=${payload.transaction_uuid},product_code=${payload.product_code}`;

    console.log("Signature String:", signatureString);
    // Attach hash to the payload
    const signature = generateEsewaSignature(ESEWA_SECRET_KEY, signatureString);

    console.log("Generated Signature:", signature);

    payload.signature = signature;
    console.log("Full Payload:", payload);

    res.json({
      esewaUrl: BASE_URL,
      payload,
      debug: {
        signatureString,
        signature,
        secretKeyLength: ESEWA_SECRET_KEY.length,
      },
    });
  } catch (error) {
    console.error("eSewa Payment Error:", error);
    res.status(500).json({
      message: "Error initiating payment",
      error: error.message,
    });
  }
});
router.get("/esewa/success", (req, res) => {
  res.send("Payment Successful!");
});

// Failure route to handle failed payments
router.get("/esewa/failure", (req, res) => {
  res.send("Payment Failed!");
});

router.all("/esewa/verify", async (req, res) => {
  const data = req.method === "POST" ? req.body : req.query;

  const { transactionDetails, eventId, userId } = req.body;
  let amount = transactionDetails.total_amount;
  if (typeof amount === "string") {
    amount = amount.replace(/,/g, ""); // Remove commas
  }
  amount = parseFloat(amount);

  if (transactionDetails.status !== "COMPLETE") {
    return res
      .status(400)
      .json({ success: false, message: "Payment not complete" });
  }
  try {
    //add transaction detail
    const addTransaction = await pool.query(
      "INSERT INTO payment_transaction (transaction_code, user_id, event_id, transaction_id, amount, status) VALUES($1, $2, $3, $4, $5, $6)",
      [
        transactionDetails.transaction_code,
        userId,
        eventId,
        transactionDetails.transaction_uuid,
        amount,
        transactionDetails.status,
      ]
    );
    const eventData = await pool.query(
      "SELECT * FROM eventsinfo WHERE event_id = $1",
      [eventId]
    );
    const userData = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    console.log("test one", eventData.rows[0]);
    //edit payment status to COMPLETE in participant table

    const editParticipant = await pool.query(
      "UPDATE event_participant SET payment_status = $1 WHERE event_id = $2 AND user_id = $3",
      [transactionDetails.status,eventId, userId]
    );

    //add notification
    addNotification(
      userId,
      `✅ Registration Confirmed - ${eventData.rows[0].event_title}`,
      `Hi ${userData.rows[0].first_name},You’ve successfully registered for ${eventData.rows[0].event_title}! 🎟️ 📅 Date: ${eventData.rows[0].event_date} 📍 Location: ${eventData.rows[0].location} Looking forward to seeing you there!`
    );

    // //add participant table

    // const addParticipant = await pool.query(
    //   "INSERT INTO event_participant (event_id, user_id, participant_first_name, participant_last_name, participant_contact, participant_email, participant_team_name, payment_status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    //   [
    //     eventId,
    //     userData.rows[0].user_id,
    //     userData.rows[0].first_name,
    //     userData.rows[0].last_name,
    //     userData.rows[0].phone_number,
    //     userData.rows[0].user_email,
    //     teamName,
    //     status,
    //   ]
    // );

    res.json({
      success: true,
      message: "User added to participant table",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("eSewa Verification Error:", error);
    res.status(500).json({ error: "Server error during payment verification" });
  }
});

router.post("/participant-add", async (req, res) => {
  try {
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
