const mongoose=require("mongoose");
// id have to be same or Collectiontable name have to be same
const userSchema=new mongoose.Schema({
            name:String,
            email:String,
            password:String,

})
module.exports=mongoose.model("users",userSchema);