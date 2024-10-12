import { Request, Response } from "express";
import { Quiz } from "../models/quiz.model";
import { CustomRequest } from "../middlewares/quiz.middlewarre";
import { User } from "../models/user.model";

export async function getAllQuizzes(req: Request, res: Response) {
  try {
    const quizzes = await Quiz.find({});
    res.status(200).json({ quizzes });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

export async function getQuizById(req: Request, res: Response) {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    res.status(200).json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

export async function createQuiz(req: Request, res: Response) {
  try {
    const { question, options, correctOption } = req.body;

    const quiz = new Quiz({
      question,
      options,
      correctOption,
    });

    await quiz.save();
    res.status(201).json({ quiz });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

export async function takeQuiz(
  req: CustomRequest,
  res: Response
): Promise<void> {
  try {
    const { option } = req.body;
    const { quizId } = req.params;
    const { user } = req;

    const requiredQuiz = await Quiz.findById(quizId);

    if (!requiredQuiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    if (requiredQuiz.correctOption !== option) {
      res.status(400).json({ message: "Incorrect option selected" });
      return;
    }

    requiredQuiz.solvedBy.push(user.id);
    await requiredQuiz.save();

    await User.findByIdAndUpdate(
      user.id,
      { $push: { solvedQuizzes: quizId } },
      { new: true }
    );

    res.status(200).json({ message: "Correct option selected" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getQuizResults(req: Request, res: Response) {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }
    res.status(200).json({ solvedBy: quiz.solvedBy });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
