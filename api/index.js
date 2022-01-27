const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authenticationRoute = require('./routes/authentication-route');
const usersRoute = require('./routes/users-route');
const postsRoute = require('./routes/posts-route');

dotenv.config();

app.use(express.json());

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  }).then(console.log("Successfully connected to database"));
}

app.use("/api/auth", authenticationRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

app.listen(5000, () => {
  console.log('Backend is running on port', 5000);
});
