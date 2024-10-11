import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    solvedQuizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
