const express = require("express");
const router = express.Router(); 

//-- *********** Import Controller Functions *********** --//  
const AuthController = require("../controllers/AuthController"); 
//!!  ********************* Routes ********************* --// 
require('dotenv').config()

router.get("/", (req, res) => {
  res.send("Ashar Backend API")
})

// Login Route
router.post("/api/auth/login", AuthController.Login);

// Login Route
router.post("/api/auth/signup", AuthController.Signup);


// -- /*** Export all Routes ***/ -- // 
module.exports = router;


