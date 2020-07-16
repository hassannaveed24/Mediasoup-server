const contactListSchema = require('../models/contactListModel');
module.exports = app => {
// Insert API
app.post('/addContact', async function(req,res){
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
})
// Delete API
app.delete('/deleteContact/:id', function(req,res){
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
})
// GET API
app.get('/viewContact',async function(req,res){
  let contact = {};
  contact =await contactListSchema.find({},function(err,contact){
      
  });
  res.send(contact);
})
//Update API
app.post('/updateContact',async function(req,res){
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
})


app.post('/updateIndex',async function(req,res){
  console.log("Index Update Body",JSON.stringify(req.body));
  const numDoc = await contactListSchema.countDocuments();
  contactListSchema.find({},{_id:1,index:1},async function(err,contactLIst){
    if(err){
      console.log("Error 1",err);
    }
 

    console.log(contactLIst)
    //if req.body is only id and index
  
    const {newIndex, index, _id } = req.body;
    
    await contactListSchema.findByIdAndUpdate({_id},{index:contactLIst.length+256});

    // need to +1 
    if(index > newIndex ){
      contactLIst.forEach(async con =>{
        if(con.index >= newIndex && con._id!= _id){
          await contactListSchema.findByIdAndUpdate({_id:con._id},{index:(con.index+1)});
        }
        
      })
    }

    if(index < newIndex){
      contactLIst.forEach(async con =>{
        if(con.index <= newIndex && con._id!= _id){
          await contactListSchema.findByIdAndUpdate({_id:con._id},{index:(con.index-1)});
        }
      })
    }

    await contactListSchema.findByIdAndUpdate({_id},{index:newIndex});
    res.status(200).send("updated")
})
});
}