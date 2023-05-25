const express = require("express");
const PostController = require("../controller/postController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, PostController.getMyPosts);
router.post("/", authMiddleware, PostController.createPost);
router.put("/:id", authMiddleware, PostController.updatePost);

module.exports = router;
