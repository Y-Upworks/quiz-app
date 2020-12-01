const express = require("express");
const router = express.Router();
const Question = require("../models/question");
const checkAuth = require("../middleware/requirelogin");

router.post("/add", (req, res) => {
  const {
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    category,
  } = req.body;
  if (
    !question ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !answer ||
    !category
  ) {
    return res.status(422).json({ error: "all fields are required to fill " });
  } else {
    Question.findOne({ question: question })
      .then((questionexists) => {
        if (questionexists) {
          res.status(422).json({ err: "already exists this question" });
        } else {
          const newQuestion = new Question({
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            category: category,
          });
          newQuestion
            .save()
            .then((result) => {
              res
                .status(200)
                .json({ question: result, message: "successfully added" });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => console.log(err));
  }
});

router.get("/all", checkAuth, (req, res) => {
  Question.find()
    .populate("category", "_id categoryname")
    .then((questions) => {
      if (questions.length < 1) {
        res.status(200).json({
          message: "no question found",
        });
      } else {
        res.status(200).json({
          questions: questions,
          message: "successfull",
        });
      }
    })
    .catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Question.find({ category: id })
    .then((questions) => {
      if (!questions) {
        return res.status(404).json({ message: "no  question found" });
      }
      res.status(200).json({ message: "success", questions: questions });
    })
    .catch((err) => console.log(err));
});
module.exports = router;

// data:{
//     user:user,
//     questions:{
//         {
//             question:question,
//
