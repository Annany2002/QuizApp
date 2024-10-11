import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: any;
}

export function userValidation(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(403).json({ message: "Invalid token" });
        }
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
