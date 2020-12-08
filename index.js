const express=require('express');
const axios = require('axios');
const { Template } = require('ejs');
var bodyParser = require('body-parser');
require('dotenv').config()

const app= express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
let data = [];
let optionReq = [];
let lastDivision = [];
app.set("view engine", "ejs");


app.get("/", (req,res)=> {
 
   let food = " "; 
  
  if (req.query)
  {
    food=req.query.search;
  }

  axios({
    "method":"GET",
    "url":"https://food-calorie-data-search.p.rapidapi.com/api/search",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"food-calorie-data-search.p.rapidapi.com",
    "x-rapidapi-key": process.env.API_KEY,
    "useQueryString":true
    },"params":{
    "keyword":food
    }
    })
          .then((response)=>{
              
              
            let dataSet=response.data;
            res.render("search", {dataSet:dataSet, food:food});
            
          })
          .catch((error)=>{
            console.log(error)
          })
    
  });
  


app.post("/calculus", urlencodedParser, (req,res)=> {
  
let current=req.body.name;
let current2=req.body;

test(current,current2);

 function test (rName,rObj) {
  for (let i=0;i<=data.length;i++) 
  {
   
    if(data[i] && data[i].name === rName) 
    {
      return;
    }
    else if(rObj[i]) 
    {
      return;
    }
  } 
  data.push(req.body);
}
for (let i=0;i<=data.length;i++) {

 
  if (req.body[i] && data[i]) {
    
    optionReq[i]=req.body[i];
    let toNbr=Number(data[i].kcal),toNbr2=Number(data[i].protein),toNbr3=Number(data[i].carbs);
    if(lastDivision[i]){
      toNbr/=lastDivision[i];
     toNbr2/=lastDivision[i];
     toNbr3/=lastDivision[i];
    }
    
     toNbr*=req.body[i];
     toNbr2*=req.body[i];
     toNbr3*=req.body[i];
     data[i].kcal=toNbr;
     data[i].protein=toNbr2;
     data[i].carbs=toNbr3;
     lastDivision[i]=req.body[i];
    
  
  }
}
res.render("calculator", {data:data, optionReq:optionReq})
});


app.get("/calculus", (req,res) => {

  
  res.render("calculator",{data:data, optionReq:optionReq})
})

app.post("/delete",urlencodedParser, (req,res)=> {
  
  let id= req.body.search;
  //Remove requested id, last requested option and last Division from data array
  data.splice(id,1);
  optionReq.splice(id,1)
  lastDivision.splice(id,1)
  res.redirect("/calculus")
});

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`Serving on ${port}`);
})