const express = require("express");
const server = express();
const UserRouter = require("./users/userRouter");
const PostRouter = require("./posts/postRouter");

const mws = require("./mw");

server.use(express.json());
server.use(mws.logger);
server.use("/api/users", UserRouter);
server.use("/api/posts", PostRouter);

server.get("/", async (req, res) => {
  try {
    const shoutouts = await db("shoutouts");
    res.status(200).json({ messageOfTheDay: process.env.MOTD, shoutouts });
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot retrieve the shoutouts" });
  }
});

server.post("/", async (req, res) => {
  try {
    const [id] = await db("shoutouts").insert(req.body);
    const shoutouts = await db("shoutouts");

    res.status(201).json(shoutouts);
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot add the shoutout" });
  }
});

module.exports = server;
