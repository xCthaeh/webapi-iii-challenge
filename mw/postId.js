const db_posts = require("../posts/postDb");

postId = async (req, res, next) => {
  try {
    const post = await db_posts.getById(req.params.id);
    post
      ? ((req.post = post), next())
      : res.status(404).json({ message: "Post ID is invalid." });
  } catch (err) {
    res.status(500).json({ error: `¯\_(ツ)_/¯` });
  }
};

module.exports = postId;
