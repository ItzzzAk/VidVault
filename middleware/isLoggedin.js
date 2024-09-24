const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.flash('error', 'You need to be logged in to access this page');
      return res.redirect('/auth/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next();
  } catch (error) {
    req.flash('error', 'Invalid token');
    return res.redirect('/auth/login');
  }
};
