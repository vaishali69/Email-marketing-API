// jshint esversion:6

const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const https=require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,response){
response.sendFile(__dirname+"/sign-up.html");
});


app.post("/",function(req,res){
  var email=req.body.email;
  var name=req.body.Name;
  var password=req.body.password;
  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:name
        }
      }
    ]
  };

  const jsondata=JSON.stringify(data);


  const url="https://us8.api.mailchimp.com/3.0/lists/5f86a558d6";


  const options = {
    method:"POST",
    auth:"vaishali:84569997880a2dc4ef8e7820c9009a46-us8"}  


  const requests= https.request(url,options,function(response){ 
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html")
    }
    
    
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  
  requests.write(jsondata);
  requests.end();


});


app.listen(3000,function(){
  console.log("Server is Running Succesfully on 3000");
});