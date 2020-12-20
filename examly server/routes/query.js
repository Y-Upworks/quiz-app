const express = require("express");
const router = express.Router();
const Query = require("../models/query");
const checkAuth = require("../middleware/requirelogin");

router.post("/postquery/:categoryid", checkAuth, (req, res) => {
  const queryname = req.body.queryname;
  const { categoryid } = req.params;
  if (!queryname || !categoryid) {
    console.log(queryname, categoryid);
    return res.status(422).json({ error: "all fields are required" });
  } else {
    const newquery = new Query({
      queryname: queryname,
      category: categoryid,
      user: req.user._id,
    });
    newquery.populate("user", "_id name").execPopulate();
    newquery
      .save()
      .then((result) => {
        res.status(200).json({
          message: "success",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  }
});

router.get("/queries/:categoryid", (req, res) => {
  const { categoryid } = req.params;
  if (!categoryid) {
    return res.status(422).json({ err: "all felds are required" });
  } else {
    Query.find({ category: categoryid })
      .populate("user", "_id name")
      .populate("solution.postedBy", "_id name")
      .sort("-createdAt")
      .then((queries) => {
        if (!queries || queries.length <= 0) {
          return res.status(200).json({ message: "no queries" });
        }
        res.status(200).json({ message: "success", queries: queries });
      })
      .catch((err) => console.log(err));
  }
});

router.put("/solution", checkAuth, (req, res) => {
  const solution = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Query.findByIdAndUpdate(
    req.body.queryId,
    {
      $push: { solution: solution },
    },
    {
      new: true,
    }
  )
    .populate("solution.postedBy", "_id name") //populate krega solution isne post kiya
    .populate("user", "_id name") //ques kiska tha
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.status(200).json({ result: result });
      }
    });
});

router.put("/deletesolution", (req, res) => {
  const _id = req.body.solutionId;
  Query.findOne({ _id: req.body.quesId })
    .populate("solution.postedBy", "_id name")
    .populate("user", "_id name")
    .then((postexist) => {
      if (postexist) {
        postexist.solution = postexist.solution.filter((comment) => {
          return comment._id.toString() !== _id.toString();
        });
        postexist
          .save()
          .then((result) => res.status(200).json({ result: result }))
          .catch((err) => console.log(err));
      } else {
        res.status(422).json({ err: "post not exists" });
      }
    })
    .catch((err) => console.log(err));
}),
  router.delete("/deletequery/:quesId", (req, res) => {
    Query.findOne({ _id: req.params.quesId })
      .then((ques) => {
        if (!ques) {
          return res.status(400).json({ err: "not found" });
        } else {
          ques
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log("err");
            });
        }
      })
      .catch((err) => console.log(err));
  });
module.exports = router;
