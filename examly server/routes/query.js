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
    newquery
      .save()
      .then((result) => {
        res.status(200).json({ message: "success", result: result });
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
      .populate("postedBy", "_id name pic")
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

router.put("/solution", (req, res) => {
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
    .populate("solution.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/deletesolution", (req, res) => {
  const _id = req.body.solutionId;
  console.log(req.body.postId);
  console.log(req.body.commentId);
  Query.findOne({ _id: req.body.postId })
    .populate("solution.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .then((postexist) => {
      if (postexist) {
        console.log(postexist);
        postexist.solution = postexist.solution.filter((comment) => {
          return comment._id.toString() !== _id.toString();
        });
        postexist
          .save()
          .then((result) => res.json(result))
          .catch((err) => console.log(err));
      } else {
        res.status(422).json({ err: "post not exists" });
      }
    })
    .catch((err) => console.log(err));
}),
  router.delete("/deletequery/:postId", (req, res) => {
    Query.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id")
      .exec((err, post) => {
        if (err || !post) {
          return res.status(422).json({ error: err });
        }
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          post
            .remove()
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  });
module.exports = router;
