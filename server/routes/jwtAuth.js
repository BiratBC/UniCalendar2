const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//transporter for nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//registering account
router.post("/register", validInfo, async (req, res) => {
  try {
    //1.Destructure the req.body (name, email, password)

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    //2. check if user exists (is user exists then throw error)

    const userEmail = await pool.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (userEmail.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const userPhoneNum = await pool.query(
      "SELECT * FROM users WHERE phone_number = $1",
      [phoneNumber]
    );

    if (userPhoneNum.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    //3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Generate a random verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    //4. enter the new user inside our database

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, user_email, password, phone_number, is_verified, verification_token) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, email, bcryptPassword, phoneNumber,false, verificationToken]
    );
    // res.json(newUser.rows[0])
    console.log(process.env.EMAIL_PASS);
    console.log(process.env.EMAIL_USER);
    

    //email verificatioaan link
    const verificationLink = `http://localhost:5000/auth/verify-email?token=${verificationToken}&email=${email}`;

    // Send email
    await transporter.sendMail({
      from: `"smtp" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email",
      html: `<h2>Welcome to UniCalendar!</h2>
             <p>Click the link below to verify your email:</p>
             <a href="${verificationLink}">${verificationLink}</a>
             <p>This link expires in 24 hours.</p>`,
    });

    res.json({ message: "Verification email sent! Please check your inbox." });

    //5. generating our jwt token

    // const token = jwtGenerator(newUser.rows[0].user_id);

    // res.json({ token });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error sdfjlk");
  }
});

//email-verification
//this is the endpoint for verificationLink
router.get("/verify-email", async (req, res) => {
  try {
    const { token, email } = req.query;

    // Check if the token exists in the database
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = $1 AND verification_token = $2",
      [email, token]
    );

    if (user.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or expired verification token" });
    }

    // Update the user as verified
    await pool.query(
      "UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE user_email = $1",
      [email]
    );

    res.send("Email verified successfully! You can now log in.");
  } catch (error) {
    console.error(error.message);
  }
});

//Login
router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructre the req.body

    const { email, password } = req.body;

    //2. check if user doesnt exist (if not then we throw error)

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid email or password");
    }
    // email verification
    // if (!user.rows[0].is_verified) {
    //   return res.status(401).json("Please verify your email before logging in.");
    // }


    //3. check if incoming password is same as db psd

    const validPassword = await bcrypt.compare(password, user.rows[0].password); //returns boolean

    if (!validPassword) {
      return res.status(401).json("Password or Email Incorrect");
    }

    //4. give them the jwt token (it will be same token btw cause id will be same)

    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
    console.log(token);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/change-password", authorization, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);

  const userId = req.user;

  console.log(oldPassword);
  console.log(newPassword);
  console.log(userId);

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid email or password");
    }

    const validPassword = await bcrypt.compare(
      oldPassword,
      user.rows[0].password
    );

    if (!validPassword) {
      console.log("Invalid Password");

      return res.status(500).json({ message: "Invalid password" });
    }

    //hashing user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(newPassword, salt);

    const updateUser = await pool.query(
      "UPDATE users SET password = $1 WHERE user_id = $2",
      [bcryptPassword, userId]
    );

    const token = jwtGenerator(userId);
    // console.log(updateUser.rows[0]);

    res.json({ token });
    console.log(token);
  } catch (error) {
    console.error(error.message);
  }
});

router.delete("/delete-account", authorization, async (req, res) => {
  const { userPassword } = req.body;
  const userId = req.user;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(500).json({ message: "Invalid password" });
    }
    const validPassword = await bcrypt.compare(
      userPassword,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(500).json("Invalid Passowrd");
    }

    const deleteUser = await pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [userId]
    );

    return res.status(200).send("User Deleted Successfully");
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
