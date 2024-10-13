import { Request, Response } from "express";
import { compareSync, hashSync, genSaltSync, compare } from "bcrypt";
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

    // Use a promise to handle the asynchronous verification
    const verifiedUser = await new Promise((resolve, reject) => {
      verify(token, process.env.JWT_SECRET as string, async (err, decoded) => {
        // Get the decoded token
        if (err) {
          if (err?.name === "TokenExpiredError") {
            const { email, password } = req.body;

            const dbUser = await User.findOne({ email });
            if (!dbUser) {
              return reject({
                status: 404,
                message: "User not found!! Please Register",
              });
            }

            if (!compareSync(password, dbUser.password)) {
              return reject({
                status: 401,
                message: "Invalid Credentials",
              });
            }

            const newToken = sign(
              // Rename to newToken for clarity
              { email, id: dbUser._id },
              process.env.JWT_SECRET as string,
              { expiresIn: "1h" }
            );

            resolve({ dbUser, token: newToken }); // Resolve with user and new token
          } else {
            reject(err); // Reject with other verification errors
          }
        } else {
          resolve(decoded); // Resolve with the decoded token if no error
        }
      });
    });

    res.status(200).json(verifiedUser);
  } catch (error: any) {
    console.error(error);
    if (error.status) {
      // Check for custom status
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An error occurred" });
    }
  }
}
