const express = require('express');
const bodyParser=require('body-parser');
 const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post("/api/posts",(req,res,next)=>{
  const post=req.body;

  console.log(post)
})

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Method","GET,POST,PATCH,DELETE,OPTIONS");
  next();
})
 app.use('/api/posts',(req,res,next)=>{
   const posts=[
     {id:"fafd122323",
     title:"First serer",
     content:"this is comming from server1"
    },
    {id:"fafd1223267",
     title:"Second Server",
     content:"this is comming from server2"
    }
   ]
   res.status(200).json({
     message:"post fetched successfully!",
     posts:posts
   });
 })

module.exports=app;
