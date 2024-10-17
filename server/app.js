var express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
var app = express();
const portNumber = 3002;
const indexRouter = require("./routes/index");
const { sequelize } = require("./config/database"); // Import sequelize instance

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
  res.send(`Welcome to the Neokred`);
});

app.use(indexRouter);

// Listen on the specified port and connect to the database
app.listen(portNumber, async function () {
  try {
    await sequelize.authenticate(); // Authenticate the Sequelize connection
    console.log("Connection to SQL database established successfully.");
  } catch (e) {
    console.log("Unable to connect to the SQL database:", e.message);
  }

  console.log(`Server started successfully on port ${portNumber}`);
});

module.exports = app;
