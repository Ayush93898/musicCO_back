const musicModel = require("../model/music.model");
const albumModel = require("../model/album.model");
const uploadFile = require("../services/storage.service");

// as we make api, and that must be protective, only artist hi music bana sake
// as agr koi bhi req ayi for creation of music, so we check whether it have token or not
// and in token we attach id and role (so based on the role we identify the type of user)

// create music controller
const createMusic = async (req, res) => {
  try {
    // // token check
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // }

    // // verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // // role check
    // if (decoded.role != "artist") {
    //   return res.status(403).json({
    //     message: "You dont have access to create music",
    //   });
    // }

    // validate input
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return res.status(400).json({
        message: "Title and Music file are required",
      });
    }

    // upload file
    const result = await uploadFile(file.buffer.toString("base64"));

    // save in db
    const music = await musicModel.create({
      title,
      uri: result.url,
      // artist: decoded.id,
      artist: req.user.id, // from middleware
    });

    // response
    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        title: music.title,
        uri: music.uri,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//create album controller
const createAlbum = async (req, res) => {
  try {
    // // token check
    // const token = req.cookies.token;
    // if (!token) {
    //   return res.status(401).json({
    //     message: "Unauthorized",
    //   });
    // }

    // // verify token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // // role check
    // if (decoded.role != "artist") {
    //   return res.status(403).json({
    //     message: "You dont have access to create an album",
    //   });
    // }

    // create album
    const { title, musicIds } = req.body;
    if (!title || !Array.isArray(musicIds) || musicIds.length === 0) {
      return res.status(400).json({
        message: "Title and musicIds array are required",
      });
    }

    const album = await albumModel.create({
      title,
      // artist: decoded.id,
      artist: req.user.id,
      musics: musicIds,
    });

    // send response
    res.status(201).json({
      message: "Album created successfully!!",
      album: {
        id: album._id,
        title: album.title,
        artist: album.artist,
        music: album.musics,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all music
const getAllMusic = async (req, res) => {
  const musics = await musicModel
    .find()
    .limit(2) // ek baar me sirf 2 hi load hoyege(nhi toh server crash ho sakta hai)
    .populate("artist", "id username"); // dusre model se jankari
  res.status(200).json({
    message: "music fetched successfully",
    musics: musics,
  });
};

// get all albums
const getAllAlbums = async (req, res) => {
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username id");
  // .populate("musics"); // as not optimal , ek sath itna sare music load hona
  res.status(200).json({
    message: "album fetched successfully",
    albums: albums,
  });
};

const getAlbumById = async (req, res) => {
  const albumId = req.params.albumId;
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username id")
    .populate("musics");
  res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
};
module.exports = {
  createMusic,
  createAlbum,
  getAllMusic,
  getAllAlbums,
  getAlbumById,
};
