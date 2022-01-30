const router = require('express').Router();
const CategoryModel = require('../models/category-model');

router.post("/", async (request, response) => {
    const newCat = new CategoryModel(request.body);
    try {
        const savedCat = await newCat.save();
        response.status(200).json(savedCat);
    } catch (e) {
        response.status(500).json(e);
    }
});

router.get("/", async (request, response) => {
    try {
        const cats = await CategoryModel.find();
        response.status(200).json(cats);
    } catch (e) {
        response.status(500).json(e);
    }
});

module.exports = router;
