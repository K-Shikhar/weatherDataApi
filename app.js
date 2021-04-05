const express=require("express");
const https=require("https");

const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}))




app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
})

app.post("/",function(req,res)
{
   
    const query= req.body.cityname;
    const apikey="8a118eec1f6ee7b5c8dbea16d2422093#"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey
        https.get(url,function(response){
            response.on("data",function(data)
            {
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp

            const icon=weatherData.weather[0].icon
            const imgurl="https://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<p>The temp in "+query+" is " + temp + " degrees</p>");
            res.write("And the forcast is " + "<img src='" + imgurl + "'>");
            res.send();
        })
    })
})

app.listen(3000,function(){
console.log("server is running on port 3000");
});
