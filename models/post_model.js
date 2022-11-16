const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add the title']
        },
        author: {
            type: String,
            required: true
        },
        description: String
    }
);

module.exports = postSchema;