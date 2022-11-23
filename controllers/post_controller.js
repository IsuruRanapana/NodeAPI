const postModel = require("../models/post_model");
const asyncHandler = require("express-async-handler");

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await postModel.find();
    if (!posts) {
      res.status(400).json({
        message: "No posts found",
      });
    } else {
      res.json(posts);
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error in posts schema");
  }
});

const getMyPosts = asyncHandler(async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      console.log("Unauthorized");
      throw new Error("User is not found");
    }

    const posts = await postModel.find({ author: user.name });
    if (!posts) {
      res.status(400).json({
        message: "No posts found",
      });
    } else {
      res.json(posts);
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error in posts schema x");
  }
});

const findPosts = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await postModel.findById(id);

    if (!posts) {
      res.status(400).json({
        message: "No posts found",
      });
    } else {
      res.json(posts);
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error in posts schema");
  }
});

const addPost = asyncHandler(async (req, res) => {
  //   try {
  const { title, description, available } = req.body;
  const author = req.user.name;

  if (!title || !author) {
    res.status(400).json({
      message: "Provide title and author",
    });
  } else {
    const post = await postModel.create({
      title,
      author,
      description,
      available,
    });
    if (!post) {
      res.status(400).json({
        message: "Cannot create post",
      });
    } else {
      res.json(post);
    }
  }
  //   } catch (e) {
  //     console.log(e);
  //     throw new Error("Error in posts schema");
  //   }
});

const editPost = asyncHandler(async (req, res) => {
  try {
    const { title, author, description, available = true } = req.body;
    const id = req.params.id;
    const post = await postModel.findById(id);
    if (!post) {
      res.status(400).json({
        message: "No posts found",
      });
    } else {
      const updatedPost = await postModel.findByIdAndUpdate(
        id,
        {
          title,
          author,
          description,
          available,
        },
        { new: true }
      );
      if (!updatedPost) {
        res.status(400).json({
          message: "Cannot update post",
        });
      } else {
        res.json(updatedPost);
      }
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error in posts schema");
  }
});

const findPostsByAuthor = asyncHandler(async (req, res) => {
  try {
    const author = req.params.author;
    const posts = await postModel.find({ author });
    if (!posts) {
      res.status(400).json({
        message: "No posts found",
      });
    } else {
      res.json(posts);
    }
  } catch (e) {
    console.log(e);
    throw new Error("Error in posts schema");
  }
});

module.exports = {
  getPosts,
  getMyPosts,
  addPost,
  findPosts,
  editPost,
  findPostsByAuthor,
};
