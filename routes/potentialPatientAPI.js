const potentialPatient_Schema = require('../models/potentialPatientModel');

module.exports = app => {
    const http = require("http").createServer(app)
    const io = require("socket.io")(http, {
        transports: ["websocket", "polling"],
    })

    app.get('/getPotentialCase',async function(req,res){
        try{
            const potentialPatient = await potentialPatient_Schema.find();
            res.status(200).send(potentialPatient);
        }catch(err){
            res.status(406).send(err);
        }        
    })

    app.post('/savePotentialCase', async function(req, res){
        try{
            const potentialPatient = new potentialPatient_Schema(req.body);
            potentialPatient.save();
            res.status(200).send(potentialPatient);

            const potentialPatients = await potentialPatient_Schema.find();
            io.sockets.emit('broadcastPotentialPatient', potentialPatients);
        }catch(err){
            res.status(406).send(err);
        }
        
    })
}