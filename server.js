require("dotenv").config();
const express = require("express");
const server = express();
const UserRouter = require("./users/userRouter");
const PostRouter = require("./posts/postRouter");

const mws = require("./mw");

server.use(express.json());
server.use(mws.logger);
server.use("/api/users", UserRouter);
server.use("/api/posts", PostRouter);

server.get('/', async (req, res) => {
  try {
    const shoutouts = await db('shoutouts');
    const messageOfTheDay = process.env.MOTD || 'API is working woo :P'; // add this line
    res.status(200).json({ motd: messageOfTheDay, shoutouts }); // change this line
  } catch (error) {
    console.error('\nERROR', error);
    res.status(500).json({ error: 'Cannot retrieve the shoutouts' });
  }
});

module.exports = server;
