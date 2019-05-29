validatedPost = (req, res, next) => {
  req.body && Object.keys(req.body).length
    ? req.body.text !== ""
      ? next()
      : res.status(400).json({ message: "Missing a required field" })
    : res.status(400).json({ message: "Missing the data" });
};

module.exports = validatedPost;
