const express = require("express");
const router = express.Router();
const Category = require("../models/category");
const checkAuth = require("../middleware/requirelogin");

router.get("/", checkAuth, (req, res) => {
  Category.find()
    .select("-__v")
    .then((category) => {
      if (category.length >= 1) {
        res.status(200).json({
          category: category,
        });
      } else {
        return res.status(200).json({
          message: "No category found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", checkAuth, (req, res) => {
  const { categoryname } = req.body;
  console.log(req.body);
  if (!categoryname) {
    return res.status(422).json({ error: "Please  add all the fields" });
  } else {
    Category.findOne({ categoryname: categoryname })
      .then((categoryexists) => {
        if (categoryexists) {
          return res.status(422).json({ error: "User Already exists." });
        } else {
          const newCategory = new Category({
            categoryname: categoryname,
          });
          newCategory
            .save()
            .then((result) => {
              const { _id, categoryname } = result;
              res.status(200).json({
                category: { _id, categoryname },
                message: "successfully added",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }
});

module.exports = router;
