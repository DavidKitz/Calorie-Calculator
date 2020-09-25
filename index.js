const express=require('express');
const app= express();
const axios = require('axios');


app.set("view engine", "ejs");

app.get('/',(req,res)=> {
    res.render("search");
    
})
app.get("/results",(req,res)=> {
   res.render("results");
})
app.get("/information", (req,res)=> {
let food=req.query.search;

    axios({
        "method":"GET",
        "url":"https://nutritionix-api.p.rapidapi.com/v1_1/search/${food}",
        "headers":{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"nutritionix-api.p.rapidapi.com",
        "x-rapidapi-key":"1d8617a7bemsh3a5cef89dcc2608p1841e6jsnf4c58e7a3b87",
        "useQueryString":true
        },
        "params":{
          "fields":"nf_calories"
          
        
      }
        })
        .then((response)=>{
            let parser=JSON.stringify(response.data);
            
          let dataSet=response.data.hits;
          console.log(response.data.hits[0].fields)
          res.render("results", {dataSet:dataSet, food:food});

        })
        .catch((error)=>{
          console.log(error)
        })
	
});


app.listen(3000, ()=> {
    console.log("Server is running");
})