const express = "express";
const router = express.Router();
const db_users = require("./userDb");
const db_posts = require("../posts/postDb");
const mws = require("../mw");


router.post("/", mws.validatedUser, async (req, res) => {
  try {
    const user = await db_users.insert(req.body);
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({
        message: `User already exists`
      });
  }
});

router.post(
  "/:id/posts",
  mws.validatedPost,
  mws.validatedId,
  async (req, res) => {
    try {
      let post = { ...req.body, user_id: req.params.id };
      post = await db_posts.insert(post);
      res.status(201).json(post);
    } catch (err) {
      res
        .status(500)
        .json({
          message: `¯\_(ツ)_/¯`
        });
    }
  }
);


router.get("/", async (req, res) => {
  try {
    const users = await db_users.get();
    users.length > 0
      ? res.status(200).json(users)
      : res
          .status(400)
          .json({ message: `Sorry, user was not found.` });
  } catch (err) {
    res
      .status(500)
      .json({
        error: `¯\_(ツ)_/¯`
      });
  }
});

router.get("/:id", mws.validatedId, async (req, res) => {
  try {
    const user = await db_users.getById(req.params.id);
    user
      ? res.status(200).json(user)
      : res
          .status(404)
          .json({
            message: `Sorry, user was not found`
          });
  } catch (err) {
    res.status(500).json({ error: `¯\_(ツ)_/¯` });
  }
});

router.get("/:id/posts", mws.validatedId, async (req, res) => {
  try {
    const posts = await db_users.getUserPosts(req.params.id);
    posts.length > 0
      ? res.status(200).json(posts)
      : res
          .status(200)
          .json({ message: `Post was not found.` });
  } catch (err) {
    res.status(500).json({ error: `Unexpected error retrieving the post.` });
  }
});

router.put(
  "/:id",
  mws.validatedUser,
  mws.validatedId,
  async (req, res) => {
    try {
      (await db_users.update(req.params.id, req.body))
        ? res.status(200).json({ id: req.params.id, ...req.body })
        : res.status(404).json({ message: `User not found.` });
    } catch (err) {
      res.status(500).json({ error: `Unexpected error retrieving the user.` });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    (await db_users.remove(req.params.id))
      ? res.status(200).json({ message: `User was removed.` })
      : res
          .status(404)
          .json({
            message: `User not found.`
          });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error occurred while attempting to remove the user.` });
  }
});

module.exports = router;
