const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization  = require("../middleware/authorization");


//registering account
router.post("/register",validInfo, async (req, res) => {
  try {
    //1.Destructure the req.body (name, email, password)

    const { firstName,lastName, email, phoneNumber, password } = req.body;

    //2. check if user exists (is user exists then throw error)

    const userEmail = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email
    ]);    

    if (userEmail.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const userPhoneNum = await pool.query("SELECT * FROM users WHERE phone_number = $1", [
        phoneNumber
      ]);    
  
    if (userPhoneNum.rows.length !== 0) {
        return res.status(401).send("User already exists");
    }

    //3. Bcrypt the user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. enter the new user inside our database

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, user_email, password, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, bcryptPassword, phoneNumber]
    );
    // res.json(newUser.rows[0])

    //5. generating our jwt token

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//Login
router.post("/login",validInfo, async (req, res) => {
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

    //3. check if incoming password is same as db psd

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    ); //returns boolean

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


router.get("/is-verify", authorization, 
    async (req, res) => {
    try {
       res.json(true);
        
    } catch (error) {
        console.error(error.message);
        
    }
})

module.exports = router;
