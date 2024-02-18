const 

 express = require("express"),
 auth = require("../middlewares/auth"),
 router = express.Router(),
 passport = require("passport"),
 PhotosController = require("../controllers/photosController"),
 multer = require("multer"),
 storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});
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
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

 

 //Route to add a photo to an album
router.post("/:id", passport.authenticate("jwt", { session: false }),
                    upload.single("photoImage"), PhotosController.AddPhotoToAlbum );

//Route to get photos of an album
router.get("/:id", auth, PhotosController.GetPhotosOfAnAlbum);
  
//route to edit a photo
router.put("/:id", passport.authenticate("jwt", { session: false }),
                   upload.single("photoImage"), PhotosController.EditPhoto);

//Route to get a particular photo by Id
router.get("/photo/:photo_id", auth, PhotosController.GetSelectedPhotoById);
  
//Route to delete a photo
router.delete("/:id/:photo_id",passport.authenticate("jwt", { session: false }),
               PhotosController.DeletePhoto);

//Route to like albums
router.post("/like/:photo_id", passport.authenticate("jwt", { session: false }),
                               PhotosController.PostLikeAlbums );

//Route to unlike the albums
router.post("/:id/unlike/:photo_id", passport.authenticate("jwt", { session: false }),
                                    PhotosController.PostUnlikeTheAlbums );

//Route to add comments to a photo
router.post("/:id/comment/:photo_id", 
               passport.authenticate("jwt", { session: false }),
               PhotosController.AddCommentsToAPhoto);

//Route to delete a comment
router.delete(
               "/:id/comment/:photo_id/:comment_id",
                passport.authenticate("jwt", { session: false }),
                PhotosController.DeleteAComment );
  

module.exports = router;