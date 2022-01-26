const router = require('express').Router();
const { timeout } = require('nodemon/lib/config');
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (request, response) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const newUser = new UserModel({
      username: request.body.username,
      email: request.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    response.status(200).json(user);
  } catch (e) {
    response.status(500).json(e);
  }
});

//LOGIN
router.post('/login', async (request, response) => {
  try {
    const user = await UserModel.findOne({ username: request.body.username });

    if (!user) {
      return response.status(400).json('Wrong user credentials!');
    }

    const validate = await bcrypt.compare(request.body.password, user.password);

    if (!validate) {
      return response.status(400).json('Wrong user credentials!');
    }

    const { password, ...others } = user._doc;
    response.status(200).json(others);
  } catch (e) {
    response.status(500).json(e);
  }
});

router.put('/:id', async (request, response) => {
  if (request.body.userId === request.params.id) {
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(request.params.id, {
        $set: request.body,
      });
      response.status(200).json(updatedUser)
    } catch (e) {
      response.status(500).json(e);
    }
  } else {
    response.status(401).json('You can only update your account');
  }
});

module.exports = router;
