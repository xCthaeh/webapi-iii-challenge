const logger = require("./logger");
const validatedPost = require("./validatedPost");
const postId = require("./postId");
const validatedId = require("./validatedId");
const validatedUser = require("./validatedUser");

const mws = {
  logger,
  validatedPost,
  validatedId,
  validatedUser,
  postId
};

module.exports = mws;
