const express=require('express');
const app= express();
const axios = require('axios');
const { Template } = require('ejs');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
let data=[];
let lastDivision;
app.set("view engine", "ejs");




app.get('/',(req,res)=> {
    res.render("search");
    
    
})


app.post("/calculus", urlencodedParser, (req,res)=> {


 let current=req.body.name;
 let current2=req.body;

test(current,current2);

 function test (rName,rObj) {
  for (let i=0;i<=data.length;i++) {
    console.log(rObj[i]);
    if(data[i] && data[i].name===rName) {
      return;
    }
    else if(rObj[i]){
     
      return;
    }
  }
  
  data.push(req.body);
}

for (let i=0;i<=data.length;i++) {
  if (req.body[i] && data[i]) {
    if (lastDivision!=undefined) {
      let toNbr=Number(data[i].kcal),toNbr2=Number(data[i].protein),toNbr3=Number(data[i].carbs);
      toNbr=toNbr/lastDivision;
      toNbr2=toNbr2/lastDivision;
      toNbr3=toNbr3/lastDivision;
      toNbr*=req.body[i];
      toNbr2*=req.body[i];
      toNbr3*=req.body[i];
      data[i].kcal=Math.round((toNbr * 100) / 100).toFixed(2);
      data[i].protein=Math.round((toNbr2 * 100) / 100).toFixed(2);
      data[i].carbs=Math.round((toNbr3 * 100) / 100).toFixed(2);
      lastDivision=req.body[i];
    }
    else {
    let toNbr=Number(data[i].kcal),toNbr2=Number(data[i].protein),toNbr3=Number(data[i].carbs);
    toNbr*=req.body[i];
    toNbr2*=req.body[i];
    toNbr3*=req.body[i];
    data[i].kcal=Math.round((toNbr * 100) / 100).toFixed(2);
    data[i].protein=Math.round((toNbr2 * 100) / 100).toFixed(2);
    data[i].carbs=Math.round((toNbr3 * 100) / 100).toFixed(2);
    lastDivision=req.body[i];
  }
  }
}

res.render("calculator", {data:data})
});

app.get("/calculus/:id", (req,res)=> {
  const { id } = req.params;
  data.splice(id,1);
  console.log(data);
  res.render("calculator",{data:data})
});

app.get("/results",(req,res)=> {
  
})

app.get("/information", (req,res)=> {
let food=req.query.search;

axios({
  "method":"GET",
  "url":"https://food-calorie-data-search.p.rapidapi.com/api/search",
  "headers":{
  "content-type":"application/octet-stream",
  "x-rapidapi-host":"food-calorie-data-search.p.rapidapi.com",
  "x-rapidapi-key":"1d8617a7bemsh3a5cef89dcc2608p1841e6jsnf4c58e7a3b87",
  "useQueryString":true
  },"params":{
  "keyword":food
  }
  })
        .then((response)=>{
            
            
          let dataSet=response.data;
         
          res.render("results", {dataSet:dataSet, food:food});
          
        })
        .catch((error)=>{
          console.log(error)
        })
	
});


app.listen(3000, ()=> {
    console.log("Server is running");
})