const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add the title"],
  },
  author: {
    type: String,
    required: true,
  },
  description: String,
  available: {
    type: Boolean,
    required: [true, "This is needed"],
  },
});

module.exports = mongoose.model("Post", postSchema);
