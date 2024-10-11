import { model, Schema } from "mongoose";

const quizSchema = new Schema(
  {
    question: { type: String, required: true, unique: true },
    options: { type: [String], required: true },
    correctOption: { type: Number, required: true },
    solvedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Quiz = model("Quiz", quizSchema);
