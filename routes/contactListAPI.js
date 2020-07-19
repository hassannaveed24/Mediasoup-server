const contactListSchema = require('../models/contactListModel');
module.exports = app => {
// Insert API
app.post('/addContact', async function(req,res){
    try{
        var myData = new contactListSchema(req.body);
        console.log(JSON.stringify(req.body));
        console.log("My Data",JSON.stringify(myData));
        myData.save()
        .then(item => {
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
    }catch(err){
        console.log(err)
    }    
})
// Delete API
app.delete('/deleteContact/:id', function(req,res){
    try{
        const id = req.params.id;
        console.log(`ID is ${id}`);
        contactListSchema.deleteOne({_id:id}).then(resp => {
        res.status(200).send({
          sucess:{
            message:"Sucessfully Deletec"
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
        console.log(err)
    }
  
})
// GET API
app.get('/viewContact',async function(req,res){
    try{
        let contact = {};
        contact =await contactListSchema.find({},function(err,contact){
        }).sort('index');
        res.send(contact);
    }catch(err){
        console.log(err)
    }
  
})
//Update API
app.post('/updateContact',async function(req,res){
    try{
        console.log("Update Body"+JSON.stringify(req.body));
        contactListSchema.findOneAndUpdate({_id : req.body.id},req.body,function(err,doc){
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


app.post('/updateIndex',async function(req,res){
    try{
        console.log("Index Update Body",JSON.stringify(req.body));
        const numDoc = await contactListSchema.countDocuments();
        contactListSchema.find({},{_id:1,index:1},async function(err,contactLIst){
          if(err){
            console.log("Error 1",err);
          }
        
          console.log(contactLIst)
          var minValue = contactLIst[0].index; 
          for(var i=0;i<contactLIst.length;i++){ 
            if(contactLIst[i].index < minValue){ 
              minValue = contactLIst[i].index; 
            } 
          } 
          console.log("Start",minValue);
          console.log("Length",contactLIst.length);
          const {newIndex, index, _id } = req.body;
          var aindex,anewindex;
          for(var i =0;i<contactLIst.length;i++){
            if(contactLIst[i].index == index){
              aindex=i;
            }
            if(contactLIst[i].index == newIndex){
              anewindex = i;
            }
          }
          var returnArray=array_move(contactLIst,aindex,anewindex);
          console.log("Retrun Array",returnArray);
      
      
      
          for(var i=0;i<contactLIst.length;i++){
            returnArray[i].index = minValue;
            minValue++;
          }
          console.log("Retrun Array After",returnArray);
          
          for(var i =0;i<returnArray.length;i++){
          await contactListSchema.findByIdAndUpdate({_id:returnArray[i]._id},{index:returnArray[i].index});
          }
          res.status(200).send({
            sucess:{
              message:"Sucessfully Updated"
            }
          })
      })
      function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
      };
    }catch(err){
        console.log(err)
    }
  
});
}