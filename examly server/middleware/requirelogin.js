const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res.status(401).json({ error: "you must be logged in" });
  }
  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must be logged in" });
    }

    const { id } = payload;
    User.findById(id).then((userdata) => {
      if (!userdata) {
        return res.status(422).json({ err: "user not exists" });
      } else {
        req.user = userdata;
      }

      // console.log(req.user);
      next();
    });
  });
};
