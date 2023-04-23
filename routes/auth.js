// @ts-nocheck
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post('/register', async (req, res) => {
   try {
      //generate new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      const newUser = new User({
         username: req.body.username,
         email: req.body.email,
         password: hashedPassword,
      });
      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});


//LOGIN
router.post('/login', async (req, res) => {
   try {
      // check if user exists
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).send("user not found")
      //check if user password is valid
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")

      //if user enter valid email and password
      res.status(200).json(user);
   } catch (err) {
      res.status(500).json(err);
   }
});


module.exports = router;
