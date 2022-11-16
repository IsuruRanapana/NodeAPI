const express = require("express");
const postController = require("../controllers/post_controller");

const router = express.Router();

router.route("/").get(postController.getPosts).post(postController.addPost);
router.route("/:id").get(postController.findPosts).put(postController.editPost);
router.route("/findbyauthor/:author").get(postController.findPostsByAuthor);

module.exports = router;
