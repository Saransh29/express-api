const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const postSchema  = mongoose.model("Post", Post);
module.exports = postSchema ;
