import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/", new UserController().signup);

userRouter.post("/", new UserController().friendship);


