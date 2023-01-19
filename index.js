const express = require("express");
require("./db/Config");
require ("dotenv").config();
const cors = require("cors");
const User = require("./db/User");
const app = express();
const port = process.env.PORT|| 5000


const Jwt =require('jsonwebtoken');
const jwtkey='netflixclone'
app.use(cors());
app.use(express.json());
app.post("/register", async(req,resp)=>{
    let user = new User(req.body);
    let result = await user.save()
    result = result.toObject();
    delete result.password;
    // resp.send(req.body);
    Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
         resp.send({result:"something went wrong"})
        }
         resp.send({result,auth: token});
         
     })

})

app.post("/login",async(req,resp)=>{
    if (req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-Password");

        if (user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
               if(err){
                resp.send({result:"something went wrong"})
               }
                resp.send({user ,auth: token});
                
            })
       
        } else {
            resp.send({ result: "usernot found" });
        }
    } else {
        resp.send({ result: "usernot found" });
    }
});



app.listen(port, () => {
    console.log(`Server start at port no ${port}`);
});