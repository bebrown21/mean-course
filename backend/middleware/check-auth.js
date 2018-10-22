const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    console.log(jwt.verify(token, 'this_is_development_secret_key'));
    next();
  } catch (error) {
    res.status(401).json({ message: 'Auth Failed!' });
  }
}
