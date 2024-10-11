import { Request, Response } from "express";
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { User } from "../models/user.model";
import "dotenv/config";

export async function userRegister(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const hashedPassword = hashSync(password, genSaltSync(10));

    const user = await User.create({ email, password: hashedPassword });

    const signedToken = sign(
      { email, password },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );
    res.status(201).json({ user, signedToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }

    if (!compareSync(password, user.password)) {
      res.status(403).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
}
