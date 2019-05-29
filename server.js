const express = require("express");
const server = express();

server.use(express.json(), mw.logger);
//custom middleware

const mws = require("./mw");

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
