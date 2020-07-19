const express = require("express")
const app = express()
const http = require("http").createServer(app)
const io = require("socket.io")(http, {
  transports: ["websocket", "polling"],
})
const potentialPatient_Schema = require('./models/potentialPatientModel.js');
const propertyManager_Schema = require('./models/propertyManagerModel');

io.on('connection', (client) => {
    
    client.on('testSocket', (req, res)=>{
        console.log('Hello console.');
        res.send('hello');
    })

    // Setting Threshold by property manager
    client.on('saveThreshold', async req => {
        try{
            let threshold = new threshold_Schema(req.body);
            await threshold.save();
            threshold = await threshold_Schema.find();
            client.emit('broadcastThreshold', threshold);
        }catch(err){
            console.log(err);
        }
    })

    // Disconnecting Socket
    client.on("disconnect", () => {
        console.log("Socket disconnected")
    })
})