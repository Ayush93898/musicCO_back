require('dotenv').config() // config dotenv--> so that we can use .env

const app = require("./src/app");
const connectDb = require('./src/db/db'); 

connectDb()

app.listen(3000, () => {
  console.log("Server is running at PORT:3000");
});
