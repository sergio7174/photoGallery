"use strict";


const 
 express = require("express"),
  // use the Router module in Express.js
  router = require("express").Router(),
  passport = require("passport"),
  sharp = require("sharp"),
  fs = require("fs"),
  multer = require("multer"),
  UserController = require("../controllers/userController");
   //const validateRegisterInput = require("../validator/register");
   const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, "./uploads/profilepics");},

 filename: function(req, file, cb) {
   cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);}});

   let secretOrKey = "secret123";
   
   const upload = multer({
     storage: storage,
     fileFilter: function(req, file, callback) {
       if (
         file.mimetype !== "image/png" &&
         file.mimetype !== "image/jpg" &&
         file.mimetype !== "image/jpeg"
       ) {
         return callback(new Error("Only images are allowed"));
       }
       callback(null, true);},limits: {fileSize: 1024 * 1024 * 5}});



//Route for registering the users
router.post("/register", upload.single("profileImage"), UserController.RegisterUser );

//Route for logging users
router.post("/login", UserController.login);

//route to send a user based on albumId
router.get("/:id",UserController.UserbasedOnAlbumId );

//route to get current user
router.get("/current/:id", UserController.GetCurrentUser);

//route to edit a particular user
router.put("/:id", passport.authenticate("jwt", { session: false }),
    upload.single("profileImage"),UserController.EditSelectUser);

//route to get all the albums of a user
router.get("/albums/:id", UserController.GetAllUserAlbums );




  module.exports = router;