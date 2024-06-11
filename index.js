import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { createClient } from 'redis';
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const client = createClient({
  password: 'LuxOIB5kCbjlWtkywBql4hLxbXqN75L2',
  socket: {
      host: 'redis-16313.c246.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 16313
  }
});
await client.connect();
client.on('error', error => {
  console.error(`Redis client error:`, error);
});

await client.hSet('jaipur', {
  city: 'Jaipur',
  description:'Partly cloudy throughout the day.',
  temperature:40,
  mintemp:30,
  maxtemp:45,
  feelslike:40,
  windspeed:27,
  sunrise:'05:36:02',
  sunset:'19:16:49',
  dew:13.2,
  humidity:23.3,
  pricepprob:0,
  visibility:24,
  pressure:1000
});

app.get("/", async(req, res) => {
  let usercity = await client.HGETALL('jaipur');
  res.render("index.ejs",{description:"Weather description in your city is...",usercity});
  console.log("success");
});
app.post("/getcity",async(req,res)=>{
  const city=req.body.city;
  console.log(city);
  var usercit = await client.HGET(`${city}`,'city');
  console.log(usercit);
  if(usercit=== null){
    console.log("Cache was empty,API was called");
    const weathresult = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&key=Y5G4VWTN9NL66SWCSXBCMVZM2&contentType=json&include=days`);
    //console.log(weathresult.data.days[0]);
    const result=weathresult.data.days[0];
    await client.hSet(`${city}`,{
      city: city,
      description:result.description,
      temperature:result.temp,
      mintemp:result.tempmin,
      maxtemp:result.tempmax,
      feelslike:result.feelslike,
      windspeed:result.windspeed,
      sunrise:result.sunrise,
      sunset:result.sunset,
      dew:result.dew,
      humidity:result.humidity,
      pricepprob:result.precipprob,
      visibility:result.visibility,
      pressure:result.pressure
    });
    let usercity = await client.HGETALL(`${city}`);
    res.render("index.ejs",{usercity});
  }
  else{
    console.log("City was cached");
    let usercity = await client.HGETALL(`${city}`);
    res.render("index.ejs",{description:"Weather description in your city is...",usercity});
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
