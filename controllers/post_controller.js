const postSchema = require('../models/post_model');
const asyncHandler = require('express-async-handler');

const getPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await postSchema.find();
        if (!posts) {
            res.status(400).json({
                message: "No posts found"
            });
        } else {
            res.json(posts);
        }
    } catch (e) {
        console.log(e);
        throw new Error('Error in posts schema');
    }
});

module.exports = {getPosts};
