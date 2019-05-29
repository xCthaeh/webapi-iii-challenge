const logger = require("./logger");
const validatedPost = require('./validatedPost')
const validatedId = require("./validatedId").default;
const validatedUser = require("./validatedUser");

const mws = {
  logger,
  validatedPost,
  validatedId,
  validatedUser
};

module.exports = mws;
