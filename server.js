const express = require("express");
const server = express();
const UserRouter = require("./users/userRouter");

server.use(express.json(), mw.logger, "/api/users", UserRouter);

//custom middleware

const mws = require("./mw");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
