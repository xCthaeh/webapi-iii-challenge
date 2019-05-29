const express = require("express");
const router = express.Router();
const db_posts = require("./postDb");
const mws = require("../mw");

router.get("/", async (req, res) => {
  try {
    const posts = await db_posts.get();
    posts.length > 0
      ? res.status(200).json(posts)
      : res.status(400).json({ message: `Post was not found.` });
  } catch (err) {
    res.status(500).json({ message: `Error retrieving posts.` });
  }
});

router.get("/:id", mws.postId, async (req, res) => {
  try {
    res.status(200).json(await db_posts.getById(req.params.id));
  } catch (err) {
    res.status(500).json({ message: `Error retrieving posts.` });
  }
});

router.put("/:id", mws.postId, async (req, res) => {
  try {
    (await db_posts.update(req.params.id, req.body))
      ? res.status(200).json({ id: req.params.id, ...req.body })
      : res.status(404).json({ message: `Cannot find post.` });
  } catch (err) {
    res.status(500).json({ error: `¯\_(ツ)_/¯` });
  }
});

router.delete("/:id", mws.postId, async (req, res) => {
  try {
    (await db_posts.remove(req.params.id))
      ? res.status(200).json({ message: `Post was removed.` })
      : res.status(404).json({ message: `Invalid post.` });
  } catch (err) {
    res.status(500).json({
      error: `¯\_(ツ)_/¯`
    });
  }
});

module.exports = router;
