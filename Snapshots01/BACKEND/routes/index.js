"use strict";

const 
  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  // use system routes
  userRoutes = require("./userRoutes"),
  PhotosRoutes = require("./photosRoutes"),
  AlbumsRoutes = require("./albumsRoutes");
  // userRoutes = require("./users"),
  //PhotosRoutes = require("./photos"),
  //AlbumsRoutes = require("./albums");
  
  // Adding routes for each page and request type
router.use("/api/users", userRoutes);

router.use("/api/photos", PhotosRoutes);

router.use("/api/albums", AlbumsRoutes);


module.exports = router;

