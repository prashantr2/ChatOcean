const mongoose = require('mongoose');
require('dotenv').config();

// Connecting to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, 
  { useNewUrlParser: true, useUnifiedTopology: true }
  , () => {
    console.log("Connected to MongoDB")
  });
