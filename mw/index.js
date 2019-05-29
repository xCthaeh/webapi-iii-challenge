const logger = require("./logger");
const validatedId = require('./validatedId').default

const mws = {
  logger,
  validatedPost,
  validatedId,
};

module.exports = mws;
