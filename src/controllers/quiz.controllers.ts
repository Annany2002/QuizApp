import { Request, Response } from "express";
import { Quiz } from "../models/quiz.model";

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

export async function takeQuiz(req: Request, res: Response) {
  try {
    // const { quizId, option } = req.body;
    const { quizId } = req.params;
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}
