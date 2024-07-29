const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js");
const connect = require("./public/database/server.js");
const appExp = express();
const path = require("path");

dotenv.config();

//Set hbs as view engine
appExp.set("view engine", "hbs");
appExp.set("views", path.join(__dirname, "views"));
// hbs.registerPartials(__dirname + "/views/partials")

appExp.use(bodyParser.json())
appExp.use(bodyParser.urlencoded( {extended: true } ))
//Set static directory
appExp.use(express.static(__dirname + "/public"));
//User a router for controllers
appExp.use("/", routes);

//Run on Local Host and connect to Mongo DB
appExp.listen(process.env.SERVER_PORT, async function(){
  console.log("Running on port: " + process.env.SERVER_PORT);
  try{
      await connect();
      console.log("connected to database!");
  }catch(err){
      console.error(err);
      console.log("Failed to connect to database");
  }
});