const config = require ('../config');
const client = require('twilio')(config.app.SID , config.app.TOKEN )
const cleaner_Schema = require('../models/cleanerModel');

module.exports = app => {
    app.get('/sendmessage/:type/:entranceName/:id', async(req,res)=>{
        try{
            if(req.params.type == "SecurityTeam"){
                const security = await cleaner_Schema.find({role:"Security Team", _id: req.params.id},{phoneNumber:1});
                let phoneNumber = security[0].phoneNumber.toString();
    
                client.messages.create({
                    to:  phoneNumber,
                    from: '+15713843536',
                    body: `Potential case suspected at ${req.params.entranceName}`
                }).then(() => res.status(200).send('Message has been Sent.'))

            }else if(req.body.type == "CleaningTeam"){
                const cleaning = await cleaner_Schema.find({role:"Cleaning Team", _id: req.params.id},{phoneNumber:1});
                let phoneNumber = cleaning[0].phoneNumber.toString();
    
                client.messages.create({
                    to:  phoneNumber,
                    from: '+15713843536',
                    body: `Potential case suspected at ${req.params.entranceName}`
                }).then(() => res.status(200).send('Message has been Sent.'))
            }
        }catch(err){
            res.status(406).send(err)
        }
    
    }
    )
 
}