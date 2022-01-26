const router = require('express').Router();
const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');

// UPDATE
router.put('/:id', async (request, response) => {
  if (request.body.userId === request.params.id) {
    if (request.body.password) {
      const salt = await bcrypt.genSalt(10);
      request.body.password = await bcrypt.hash(request.body.password, salt);
    }
    console.log('test:::::');
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        request.params.id,
        {
          $set: request.body,
        },
        { new: true }
      );
      console.log(updatedUser);
      response.status(200).json(updatedUser);
    } catch (e) {
      response.status(500).json(e);
    }
  } else {
    response.status(401).json('You can only update your account');
  }
});

module.exports = router;
