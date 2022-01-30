const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authenticationRoute = require('./routes/authentication-route');
const usersRoute = require('./routes/users-route');
const postsRoute = require('./routes/posts-route');
const categoriesRoute = require('./routes/categories-route');
const multer = require('multer');
const cors = require('cors');

dotenv.config();

app.use(express.json(), cors());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  }).then(console.log("Successfully connected to database"));
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "img");
  },
  filename: (req, file, callback) => {
    callback(null, "hello.jpg");
  }
});

const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
})

app.use("/api/auth", authenticationRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/categories", categoriesRoute);

app.listen(5000, () => {
  console.log('Backend is running on port', 5000);
});
