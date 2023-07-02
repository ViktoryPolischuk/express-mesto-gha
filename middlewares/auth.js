const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};
