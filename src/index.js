require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { hitsService } = require("./api/nodejs_list/hits.services");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// parse application/json
app.use(bodyParser.json());
app.use("/api", require("./routes"));

//Cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

  next();
});

app.options("*", cors());

// The cron job is executed once every hour.
cron.schedule("0 0 * * * *", async () => {
  let date = new Date();
  console.log("extrat data from the API-Rest " + date);
  await hitsService.serverConectHits(date);
  date = new Date();
  console.log("Process finishes " + date);
});
// Mongo Conection
mongoose
  .connect(process.env.urlMongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resp) => {
    console.log("--------------------------------");
    console.log("succesfully  conection");
  })
  .catch((e) => {
    console.log("Error to conected", e.toString());
  });

app.listen(process.env.PORT, () => {
  console.log("AMBIENTE:    " + process.env.AMBIENTE);
  console.log("URL NODE:     http://localhost:" + process.env.PORT);
});
