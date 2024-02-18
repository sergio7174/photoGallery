const express = require("express");
const app = express();
const users = require("./routes/users");
const photos = require("./routes/photos");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const albums = require("./routes/albums");
//const db = require("./config/keys").mongoURI;
var cors = require("cors");

app.use(cors());

//use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose will support my promise chains  
mongoose.Promise = global.Promise;
// Add Mongoose connection to Express.js
mongoose.connect(
// Set up the connection to your database.  
 "mongodb://localhost:27017/snapshot01",

 
  {// useNewUrlParser: true , // not longer neccesary
	// useFindAndModify: false } // not longer neccesary
  });
//mongoose.set("useCreateIndex", true); // not longer neccesary
// Assign the database to the db variable.
const db = mongoose.connection;

// Log a message when the application connects to the database.
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});
//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

app.use("/uploads", express.static("uploads"));
//config routes
app.use("/api/users", users);
app.use("/api/photos", photos);
app.use("/api/albums", albums);
app.get("/", (req, res) => {
  res.send("Hello");
});
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
