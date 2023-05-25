const User = require("../mongodb/User");
const Post = require("../mongodb/Post");

class PostController {
  static async createPost(req, res) {
    const { title, content } = req.body;

    try {
      const newPost = new Post({
        title,
        content,
        author: req.userId,
      });

      const result = await newPost.save();
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async getMyPosts(req, res) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const sort = req.query.sort || "createdAt";

    try {
      const posts = await Post.find({ author: req.userId })
        .sort(sort)
        .skip((page - 1) * size)
        .limit(size);
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  static async updatePost(req, res) {
    const { title, content } = req.body;

    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      if (post.author.toString() !== req.userId) {
        return res.status(401).json({ error: "Not authorized" });
      }

      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: { title, content } },
        { new: true }
      );

      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
module.exports = PostController;
