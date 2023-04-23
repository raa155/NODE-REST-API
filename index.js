// @ts-nocheck

// Add express library and create app using express framework
const express = require("express");
const app = express();

// Add Other libraries
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');


//import routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

// Utilize dotenv
dotenv.config();

//connect mongoDB

const connectDB = async () => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology:true})
      console.log(`DB CONNECTED: ${conn.connection.host}`)
   } catch (err) {
      console.log(err);
   }
}


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//use routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

connectDB();


app.listen(8800, () => {
   console.log("Backend Server is running.")
})
