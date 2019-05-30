const express = require("express");
const server = express();
const UserRouter = require("./users/userRouter");
const PostRouter = require("./posts/postRouter");

const mws = require("./mw");

server.use(express.json());
server.use(mws.logger);
server.use("/api/users", UserRouter);
server.use("/api/posts", PostRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Api is working :P <br/>${process.env.MOTD}</h2>`);
});

module.exports = server;
