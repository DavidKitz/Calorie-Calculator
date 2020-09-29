const express=require('express');
const app= express();
const axios = require('axios');
const { Template } = require('ejs');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
let data=[];
// get information from the table to a form and send it to "/" or mby send to localstorage and get it from there?
app.set("view engine", "ejs");




app.get('/',(req,res)=> {
    res.render("search");
    
    
})
app.post("/", urlencodedParser, (req,res)=> {


 let current=req.body.name;
 let current2=req.body;
 test(current,current2);
 
 function test (rName,rObj) {
  for (let i=0;i<=data.length;i++) {

    if(data[i] && data[i].name===rName) {
      console.log("I SHOULD NOT BE HERE");
      return;
    }
  }
  data.push(rObj);
}

res.render("calculator", {data:data})
})

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
            let parser=JSON.stringify(response.data);
            
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