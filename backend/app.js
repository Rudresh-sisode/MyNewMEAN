const path=require("path");
const express = require('express');
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const postsRoutes = require('./routes/posts')
const userRoutes= require('./routes/user');

 const app = express();

 mongoose.connect("mongodb+srv://sohame:uUsTDk0Xh76ixWzx@cluster0-sgwbe.mongodb.net/angular-node?retryWrites=true&w=majority")
 .then(()=>{
   console.log("Connection to DB");
 })
 .catch(()=>{
   console.log("Connection Fail");
 });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images",express.static(path.join("backend/images")))
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept,authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
})/*
app.post("/api/posts",(req,res,next)=>{
  const post= new Post({
    title:req.body.title,
    content:req.body.content
  })
  console.log(post);
  post.save().then(result=>{
    res.status(201).json({
      message:"Post added successfully",postId:result._id
    });
  });
});

app.get("/api/posts/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({msg:"post not found"});
    }
  });
});

app.put("/api/posts/:id",(req,res,next)=>{
  const post=new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content
  })
  Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.status(200).json({message:"Updated Successfully"})
  })
})

 app.get('/api/posts',(req,res,next)=>{
   Post.find()
   .then(documents =>{
     console.log(documents)
     res.status(200).json({
      message:"post fetched successfully!",
      posts:documents
    });
   });
 });

 app.delete("/api/posts/:id",(req,res,next)=>{
   Post.deleteOne({_id:req.params.id}).then(result=>{
     console.log(result);
     console.log(req.params.id);
   res.status(200).json({message:"Post deleted Successfully"});
   });
 })
*/
app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports=app;
//uUsTDk0Xh76ixWzx
//mongo "mongodb+srv://cluster0-sgwbe.mongodb.net/test"  --username sohame
