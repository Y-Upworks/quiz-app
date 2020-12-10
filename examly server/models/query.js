const mongoose = require("mongoose");
const querySchema = new mongoose.Schema(
  {
    queryname: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    user: {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      //   ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("query", querySchema);
