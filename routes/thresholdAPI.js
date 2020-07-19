const threshold_Schema = require('../models/thresholdModel');

module.exports = app => {
    app.get('/viewThreshold', async (req, res)=>{
        try{
            const threshold = await threshold_Schema.find();
            res.status(200).send(threshold);
        }catch(err){
            res.status(406).send(err);
        } 
    })
    app.post('/addThreshold', async (req,res)=>{
        try{
            const threshold = new threshold_Schema(req.body);
            await threshold.save();
            res.status(200).send(threshold);
        }catch(err){
            res.status(406).send(err);
        } 
    })
}