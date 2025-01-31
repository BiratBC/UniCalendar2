const router = require("express").Router();
const { query } = require("express");
const pool = require("../db");
const authorization = require("../middleware/authorization");
// const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const uuidv4 = require("uuid").v4;

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
    return res.status(400).json({ message: "Amount ,Event ID or userId required" });
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
      success_url: `http://localhost:3000/payment-success/${eventId}/${user_id}/`,
      failure_url: "http://localhost:5000/payment/esewa/failure",
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

router.all("/esewa/verify",async (req, res) => {
  const data = req.method === "POST" ? req.body : req.query;


  const {
    transactionDetails,
    eventId,
    userId
  } = req.body;

  if (transactionDetails.status !== "COMPLETE") {
    return res.status(400).json({ success: false, message: "Payment not complete" });
  }
  try {
   const addParticipant = await pool.query("INSERT INTO payment_transaction (transaction_code, user_id, event_id, transaction_id, amount, status) VALUES($1, $2, $3, $4, $5, $6)",
    [
      transactionDetails.transaction_code,userId, eventId, transactionDetails.transaction_uuid, transactionDetails.total_amount, transactionDetails.status
    ]
   );
   res.json({ success: true, message: "User added to participant table", data: result.rows[0] });

   
  } catch (error) {
    console.error("eSewa Verification Error:", error);
    res.status(500).json({ error: "Server error during payment verification" });
  }
});

router.post("/participant-add",async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error.message);
    
  }
})

module.exports = router;
