const http = require ('http');
const app=require('./backend/app');
const port=process.env.PORT || 3000;
/*
const server=http.createServer((req,res)=>{
  res.end("this is my first response");
});*/
app.set('port',)
const server=http.createServer(app);
server.listen(app);
console.log("server running on 3000");
