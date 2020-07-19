const mongoose = require('mongoose');
const config = require ('../config');

const db = config.app.CONN;

try{
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => 
          console.log("Connected to MongoDB..")
      ).catch(err => console.log(err));
}catch(err){
    console.log(err);
}

