const express = require('express');
const bodyParser=require('body-parser');
 const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
  next();
})
app.post("/api/posts",(req,res,next)=>{
  const post=req.body;

  console.log(post);

  res.status(201).json({
    message:"Post added successfully"
  });

});


 app.get('/api/posts',(req,res,next)=>{
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
