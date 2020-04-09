const express = require('express');
const multer=require('multer');
const Post= require('../models/post');
const router = express.Router();

const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback)=> {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error("invalid mime type");
    if(isValid){
      error=null
    }
    callback(error,"backend/images")
  },
  filename: (req,file, callback)=>{
    const name=file.originalname.toLowerCase().split(" ").join("-");
    const ext=MIME_TYPE_MAP[file.mimetype];
    callback(null,name+"-"+Date.now()+"."+ext)
  }
})
router.post("",multer({storage:storage}).single("image"),(req,res,next)=>{
  const url=req.protocol + "://"+req.get("host");
  const post= new Post({
    title:req.body.title,
    content:req.body.content,
    imagePath: url + "/images/" +req.file.filename
  })
  console.log(post);
  post.save().then(result=>{
    res.status(201).json({
      message:"Post added successfully",post:{
        ...result,
        id:result._id

      }
    });
  });
});

router.get("/:id",(req,res,next)=>{
  Post.findById(req.params.id).then(post => {
    if (post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({msg:"post not found"});
    }
  });
});

router.put("/:id",multer({storage:storage}).single("image"),(req,res,next)=>{
  let imagePath=req.body.imagePath;
  if(req.file){
    const url=req.protocol + "://"+req.get("host");
    imagePath=url+ "/images/" +req.file.filename;
  }
  const post=new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content,
    imagePath:imagePath
  })
  console.log(post);
  Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.status(200).json({message:"Updated Successfully"})
  });
});

router.get('',(req,res,next)=>{
  const pageSize= +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery=Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery.skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }
  console.log(req.query);
   postQuery
   .then(documents =>{
     fetchedPosts=documents
     return Post.count()
     console.log(documents)

   }).then(count =>{
    res.status(200).json({
      message:"post fetched successfully!",
      posts:fetchedPosts,
      maxPosts:count
    });
   });
 });

 router.delete("/:id",(req,res,next)=>{
   Post.deleteOne({_id:req.params.id}).then(result=>{
     console.log(result);
     console.log(req.params.id);
   res.status(200).json({message:"Post deleted Successfully"});
   });
 })

module.exports = router;
