const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    result: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("result", resultSchema);
