import { Router } from "express";
import { userValidation } from "../middlewares/users.middleware";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  takeQuiz,
} from "../controllers/quiz.controllers";

const router = Router();

router.get("/all", userValidation, getAllQuizzes);
router.get("/all/:quizId", userValidation, getQuizById);
router.post("/create", userValidation, createQuiz);
router.post("/:quizId/take", userValidation, takeQuiz);

export default router;
