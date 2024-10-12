import { Request, Response } from "express";
import { compareSync, hashSync, genSaltSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/user.model";
import "dotenv/config";

export async function userRegister(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const hashedPassword = hashSync(password, genSaltSync(10));

    const user = await User.create({ email, password: hashedPassword });

    const signedToken = sign(
      {
        email,
        id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ user, signedToken });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function userLogin(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }

    const verifiedUser = verify(token, process.env.JWT_SECRET as string);
    // console.log("Verified User", verifiedUser);
    res.status(200).json(verifiedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
