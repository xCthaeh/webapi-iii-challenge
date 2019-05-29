const logger = require("./logger");
const validatedId = require("./validatedId").default;
const validateUser = require("./validateUser");

const mws = {
  logger,
  validatedPost,
  validatedId,
  validatedUser
};

module.exports = mws;
