const express = require("express");
const router = express.Router();
const Result = require("../models/result");
const checkAuth = require("../middleware/requirelogin");

router.post("/save", (req, res) => {
  const { user, category, percentage, marks } = req.body;
  if (!user || !category || !marks || !percentage) {
    res.status(422).json({ error: "please fill all the fields" });
  } else {
    const newResult = new Result({
      user: user,
      category: category,
      percentage: percentage,
      marks: marks,
    });
    newResult
      .save()
      .then((result) => {
        res
          .status(200)
          .json({ question: result, message: "successfully added" });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/showresult", checkAuth, (req, res) => {
  const { _id } = req.user;
  Result.findOne({ user: _id })
    .then((userexist) => {
      if (!userexist) {
        res.status(200).json({ message: "no result found" });
      } else {
        Result.find({ user: _id })
          .then((userresults) => {
            res.status(200).json({
              userresults,
              message: "successfull",
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
module.exports = router;
