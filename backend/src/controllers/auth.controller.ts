import userModel from "../models/user.model";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

import {
  loginFormSchemaEmail,
  loginFormSchemaUsername,
  RegisterFormSchema,
} from "../validation/formValidation.validation";
import ApiResponse from "../utils/ApiResponse.util";
import { MongooseError } from "mongoose";
import { verifyPassword } from "../utils/hashGen.util";
export async function handleLogin(req: Request, res: Response) {
  type BodyType = {
    username: string;
    email: string;
    password: string;
  };
  const { username, email, password }: BodyType = req.body;
  if (username) {
    const validation = loginFormSchemaUsername.safeParse({
      username,
      password,
    });
    if (validation.success) {
      const user = await userModel.findOne({
        username: validation.data.username,
      });
      if (user) {
        const [hash, salt] = user.password.split(".");
        const isPasswordMatch = verifyPassword(
          validation.data.password,
          hash,
          salt
        );
        if (isPasswordMatch) {
          res.cookie(
            "sessionId",
            jsonwebtoken.sign(
              { id: user._id, username: user.username, email: user.email },
              `${process.env.JWT_SECRET}`
            ),
            {
              httpOnly: true,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }
          );
          res
            .status(200)
            .json(
              new ApiResponse(true, "user logged in successfully", null, 200)
            );
        } else {
          res
            .status(401)
            .json(new ApiResponse(false, "invalid credentials", null, 401));
        }
      }
    } else {
      console.log(validation.error);
    }
  } else if (email) {
    const validation = loginFormSchemaEmail.safeParse({ email, password });
    if (validation.success) {
      const user = await userModel.findOne({ email: validation.data.email });
      if (user) {
        const [hash, salt] = user.password.split(".");
        const isPasswordMatch = verifyPassword(
          validation.data.password,
          hash,
          salt
        );
        if (isPasswordMatch) {
          res.cookie(
            "sessionId",
            jsonwebtoken.sign(
              { id: user._id, username: user.username, email: user.email },
              `${process.env.JWT_SECRET}`
            ),
            {
              httpOnly: true,
              expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }
          );
          res
            .status(200)
            .json(
              new ApiResponse(true, "user logged in successfully", null, 200)
            );
        } else {
          res
            .status(401)
            .json(new ApiResponse(false, "invalid credentials", null, 401));
        }
      }
    } else {
      console.log(validation.error);
    }
  } else {
    console.log("enter username or email");
    res
      .status(400)
      .json(new ApiResponse(false, "enter username or email", null, 400));
  }
}
export async function handleRegister(req: Request, res: Response) {
  type BodyType = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    confirmpassword: string;
  };
  const {
    username,
    email,
    firstname,
    lastname,
    password,
    confirmpassword,
  }: BodyType = req.body;
  const validation = RegisterFormSchema.safeParse({
    username,
    email,
    firstname,
    lastname,
    password,
    confirmpassword,
  });
  if (validation.success) {
    console.log(validation.data);
    try {
      const userDbResponse = await userModel.create({ ...validation.data });
      if (userDbResponse) {
        res
          .status(200)
          .json(
            new ApiResponse(true, "user registered successfully", null, 200)
          );
      } else {
        res
          .status(400)
          .json(
            new ApiResponse(
              false,
              "something went wrong user register unsuccessful",
              null,
              400
            )
          );
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        error.toLowerCase();
      } else if (error instanceof MongooseError) {
        res.status(400).json(new ApiResponse(false, error.message, null, 400));
      }
      res
        .status(400)
        .json(new ApiResponse(false, "something went wrong", null, 400));
    }
  } else {
    console.log(validation.error.errors[0].message);
    res
      .status(400)
      .json(
        new ApiResponse(false, validation.error.errors[0].message, null, 400)
      );
  }
}

export async function handleLogout(req:Request,res:Response) {
  res.clearCookie("sessionId");
  res.status(200).json(new ApiResponse(true, "user logged out successfully", null, 200))
}