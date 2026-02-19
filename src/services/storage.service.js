const { ImageKit } = require("@imagekit/nodejs"); //connect backend to imageKit server

const ImageKitClient = new ImageKit({
  // crate client instance that talk to imageKit
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// func that takes the file and upload it
const uploadFile = async (file) => {
  try {
    const result = await ImageKitClient.files.upload({ // 
      file,
      fileName: "music_" + Date.now(),
      folder: "/backy/music",
    });

    return result;
  } catch (error) {
    console.error("ImageKit upload failed: ", error);
    throw error;
  }
};

module.exports = uploadFile;
