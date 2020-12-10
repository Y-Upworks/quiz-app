const express = require("express");
const router = express.Router();
const Query = require("../models/query");
router.post("/postquery/:categoryid", (req, res) => {
  const queryname = req.body.queryname;
  const { categoryid } = req.params;
  if (!queryname || !categoryid) {
    console.log(queryname, categoryid);
    return res.status(422).json({ error: "all fields are required" });
  } else {
    const newquery = new Query({
      queryname: queryname,
      category: categoryid,
      user: "yash",
    });
    newquery
      .save()
      .then((result) => {
        res.status(200).json({ message: "success", result: result });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "User Already exists." });
      });
  }
});

router.get("/queries/:categoryid", (req, res) => {
  const { categoryid } = req.params;
  if (!categoryid) {
    return res.status(422).json({ err: "all felds are required" });
  } else {
    Query.find({ category: categoryid })
      .then((queries) => {
        if (!queries || queries.length <= 0) {
          return res.status(200).json({ message: "no queries" });
        }
        res.status(200).json({ message: "success", queries: queries });
      })
      .catch((err) => console.log(err));
  }
});
module.exports = router;
