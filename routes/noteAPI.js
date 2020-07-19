const note_Schema = require('../models/noteModel');

module.exports = app => {
    //Add Notes API
app.post('/addNote',function(req,res){
    try{
        var myData = new note_Schema(req.body);
        console.log("Body Here",JSON.stringify(req.body));
        console.log("My Data",JSON.stringify(myData));
        myData.save()
        .then(items => {
            res.status(200).send({
                sucess:{
                    message:"Sucessfully Saved"
                }
            });
        })
        .catch(err => {
            res.status(400).send({
                error:{
                    message:"Unable to save data",
                    error:err
                }
            });
        })
    }catch(err){
        res.status(406).send(err)
    }
    
})

//Delete Note API
app.delete('/deleteNote/:id',function(req,res){
    try{
        const id = req.params.id;
        console.log(`ID is ${id}`);
        note_Schema.deleteOne({_id:id})
        .then(resp => {
        res.status(200).send({
            sucess:{
                message:"Sucessfully Deleted"
            }
        })
        
        }).catch(err =>{
            res.status(400).send({
                error:{
                    message:"Unable to delete",
                    error:err
                }
            })
        })
    }catch(err){
        console.log(err);
    }
    
})

//View All Notes API
app.get('/viewNote',async function(req,res){
    try{
        let notes = [];
        notes = await note_Schema.find({},function(err,notes){
        })
        res.send(notes);
    }catch(err){
        console.log(err);
    }    
})

//Update API 
app.post('/updateNote',function(req,res){
    try{
        console.log("Update Body"+JSON.stringify(req.body));
        note_Schema.findOneAndUpdate({_id : req.body.id},req.body,function(err,doc){
            if(err){
                console.log(err);
                res.status(400).send({
                  error:{
                    message:"Unable to Update",
                    error:err
                  }
                });
            }
                else{
                    res.status(200).send({
                      sucess:{
                        message:"Sucessfully Updated"
                      }
                    });
                }
        })
    }catch(err){
        console.log(err)
    }
    
})

}