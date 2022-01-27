const router = require('express').Router();
const UserModel = require('../models/user-model');
const PostModel = require('../models/post-model');

// CREATE POST
router.post('/', async (request, response) => {
    const newPost = new PostModel(request.body);
    try {
        const savedPost = await newPost.save();
      response.status(200).json(savedPost);
    } catch (e) {
      response.status(500).json(e);
    }
});

// DELETE POST
router.delete('/:id', async (request, response) => {
  if (request.body.userId === request.params.id) {
    try {
      const user = await UserModel.findById(request.params.id);
      try {
        await PostModel.deleteMany({ username: user.username });
        await UserModel.findByIdAndDelete(request.params.id);
        response.status(200).json('User has been delete successfully');
      } catch (e) {
        response.status(500).json(e);
      }
    } catch (e) {
      response.status(404).json('User not found');
    }
  } else {
    response.status(401).json('You can only delete your account');
  }
});

// GET POST
router.get('/:id', async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.id);
        const {password, ...others} = user._doc;
        response.status(200).json(others)
    } catch (e) {
        response.status(500).json(e);
    }
});

module.exports = router;
