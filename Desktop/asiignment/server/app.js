var express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
var app = express();
const portNumber =3002
const indexRouter = require("./routes/index");
const { databaseConnection } = require("./config/database");

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  req.reqId = uuidv4();
  next();
});
app.get('/', async (req, res) => {
  res.send(`Welcome to the Neokred `)
})
app.use(indexRouter);


app.listen(portNumber, async function () {
  await databaseConnection().then(() => {
    console.log("Connect to MONGO-DB successfully");
  }).catch((e) => {
    console.log({ e })
    "Unable to connect to MONGO-DB.Try again"
  });
  console.log(`Server started successfully on port ${portNumber}`);
});
//dummy commi

module.exports = app;
