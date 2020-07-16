const propertyManager_Schema = require('../models/propertyManagerModel');

module.exports = app => {
    app.post('/addPropertyManager',async function(req,res){
        try{
            let check
            await  propertyManager_Schema.countDocuments({email:req.body.email,role:req.body.role},function(err,res1){
                check=!res1;
            });
           if(!check){
            res.status(400).send({
                error :{
                    message:"Email Already Exist"
                }
            })
           }
           else{
            var myData = new propertyManager_Schema(req.body);
            const password = myData.password;
            bcrypt.hash('password',10,function(err,hash){
                myData.password=hash;
                console.log(JSON.stringify(req.body));
            console.log("MY Data"+JSON.stringify(myData));
          myData.save()
            .then(item => {;
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
                });
            })
        }
        }catch(err){
            console.log(err)
        }
        
     })
    
    
    app.get('/viewPropertyManager',async function(req,res){
        try{
            let propertyManager = {};
            propertyManager =await propertyManager_Schema.find({},{password:0},function(err,propertyManager){
                
            });
            res.send(propertyManager);
        }catch(err){
            console.log(err)
        }
        
    })
    
    app.delete('/deletePropertyManager/:id', function(req,res){
        try{
            const id = req.params.id;
            console.log(`ID is ${id}`);
            propertyManager_Schema.deleteOne({_id:id}).then(resp => {
            res.status(200).send({
                sucess:{
                    message:"Sucessfully Deleted"
                }
            })
            
            }).catch(err =>{
                res.status(400).send({
                    error:{
                        message:"Unable to deleted",
                        error:err
                    }
                })
            })
        }catch(err){
            console.log(err);
        }
        
    })
    
    app.post('/updatePropertyManager',function(req,res){
        try{
            console.log("Update Body"+JSON.stringify(req.body));
            propertyManager_Schema.findOneAndUpdate({_id : req.body.id},req.body,function(err,doc){
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
