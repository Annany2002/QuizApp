import { Router } from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizResults,
  takeQuiz,
} from "../controllers/quiz.controllers";
import { userQuizValidation } from "../middlewares/quiz.middlewarre";

const router = Router();

router.get("/all", userQuizValidation, getAllQuizzes);
router.get("/all/:quizId", userQuizValidation, getQuizById);
router.get("/:quizId/results", userQuizValidation, getQuizResults);
router.post("/create", userQuizValidation, createQuiz);
router.post("/:quizId/take", userQuizValidation, takeQuiz);

export default router;
