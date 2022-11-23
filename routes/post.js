const express = require("express");
const postController = require("../controllers/post_controller");
const { protect } = require("../middleware/protection");

const router = express.Router();

router
  .route("/:id")
  .get(protect, postController.findPosts)
  .put(protect, postController.editPost);
router.route("/myposts/all").get(protect, postController.getMyPosts);
router
  .route("/")
  .get(protect, postController.getPosts)
  .post(protect, postController.addPost);
router
  .route("/findbyauthor/:author")
  .get(protect, postController.findPostsByAuthor);

module.exports = router;
