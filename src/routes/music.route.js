// this is for artist role
// only artist can create the message

const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const middleware = require("../middlewares/auth.middleware");

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router();

// create music api
router.post(
  "/upload",
  middleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);
router.post("/album", middleware.authArtist, musicController.createAlbum);
router.get("/", middleware.authUser,musicController.getAllMusic);
router.get("/albums", middleware.authUser,musicController.getAllAlbums);
router.get("/albums/:albumId", middleware.authUser,musicController.getAlbumById);

module.exports = router;
