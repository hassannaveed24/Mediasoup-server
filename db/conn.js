const mongoose = require('mongoose');

const db = "mongodb+srv://jawad:jawad@cluster0.ekzly.mongodb.net/Covid?retryWrites=true&w=majority";

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => 
      console.log("Connected to MongoDB..")
  ).catch(err => console.log(err));
