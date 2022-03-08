const { models: { User },} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// JOE CR: This is a good middleware, but would it always be used combined with `requireToken`?
// If so, can this middleware assume that req.user already exists?
const isEmployee = async (req, res, next) => {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    if (!req.user.isAdmin) {
        return res.status(403).send('Permission denied');
    } else {
        next();
    }
};

module.exports = {
    requireToken,
    isEmployee,
};