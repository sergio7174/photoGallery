const 
express = require("express"),
app = express(),
//users = require("./routes/users"),
//photos = require("./routes/photos"),
bodyParser = require("body-parser"),
passport = require("passport"),
mongoose = require("mongoose"),
//albums = require("./routes/albums"),

JwtStrategy = require("passport-jwt").Strategy,
ExtractJwt = require("passport-jwt").ExtractJwt,
//mongoose = require("mongoose"),

//User = mongoose.model("User"),
router = require("./routes/index");

//const db = require("./config/keys").mongoURI;
var cors = require("cors");
let secretOrKey = "secret123";
app.use(cors());

//use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose will support my promise chains  
mongoose.Promise = global.Promise;
// Add Mongoose connection to Express.js
mongoose.connect(
// Set up the connection to your database.  
 "mongodb://0.0.0.0:27017/snapshot01",

 
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
//require("./config/passport")(passport);

opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        console.log(err);});}));



app.use("/uploads", express.static("uploads"));
//config routes




//app.use("/api/users", users);
//app.use("/api/photos", photos);
//app.use("/api/albums", albums);
// app.get("/", (req, res) => {
//  res.send("Hello");});

// This code tells your Express.js application to use the router object as 
// a system for middleware and routing.
app.use("/", router);

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
