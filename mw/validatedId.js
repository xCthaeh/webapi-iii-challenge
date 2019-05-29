const db = require("../users/userDb");

validatedId = async (req, res, next) => {
  try {
    const user = await db.getById(req.params.id);
    user
      ? ((req.user = user), next())
      : res.status(404).json({ message: "Invalid i.d." });
  } catch (err) {
    res.status(500).json({ message: " ¯\_(ツ)_/¯ " });
  }
};

module.exports = validatedId;
