const router = require('express').Router();
const UserModel = require('../models/user-model');
const PostModel = require('../models/post-model');
const req = require('express/lib/request');

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

// UPDATE POST
router.put('/:id', async (request, response) => {
  try {
    const post = await PostModel.findById(request.params.id);

    if (post.username === request.body.username) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          request.params.id,
          { $set: request.body },
          { new: true }
        );
        response.status(200).json(updatedPost);
      } catch (e) {
        response.status(500).json(e);
      }
    } else {
      response.status(401).json('You can only update your posts');
    }
  } catch (e) {
    response.status(500).json(e);
  }
});

// DELETE POST
router.delete('/:id', async (request, response) => {
  try {
    const post = await PostModel.findById(request.params.id);

    if (post.username === request.body.username) {
      try {
        await post.delete();
        response.status(200).json('Post has been deleted');
      } catch (e) {
        response.status(500).json(e);
      }
    } else {
      response.status(401).json('You can only delete your posts');
    }
  } catch (e) {
    response.status(500).json(e);
  }
});

// GET POST
router.get('/:id', async (request, response) => {
  try {
    const post = await PostModel.findById(request.params.id);
    response.status(200).json(post);
  } catch (e) {
    response.status(500).json({e, message: "No posts found"});
  }
});

// GET All POSTs
router.get('/', async (request, response) => {
  const username = request.query.user;
  const catName = request.query.cat;
  try {
    let posts;
    if(username){
      posts = await PostModel.find({username});
    } else if(catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        }
      })
    } else {
      posts = await PostModel.find();
    }
    response.status(200).json(posts);
  } catch (e) {
    response.status(500).json({e, message: "No posts found"});
  }
});

module.exports = router;
