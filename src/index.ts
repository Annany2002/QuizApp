import express from "express";
import "dotenv/config";
import { connection } from "./utils/connection";
import userRouter from "./routes/user.route";
import quizRouter from "./routes/quiz.route";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/quizzes", quizRouter);

app.listen(PORT, () => {
  connection();
  console.log(`Server is running on http://localhost:${PORT}`);
});
