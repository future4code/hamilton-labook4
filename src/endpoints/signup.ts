import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { UserDatabase } from "../data/UserDatabase";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    if (!userData.email || !userData.name || !userData.password) {
      throw new Error("Preencha todos os campos");
    }

    const hashManager = new HashManager();
    const hashPassword = await hashManager.generateHash(userData.password);

    const idGenerator: any = new IdGenerator();
    const id: string = idGenerator.generateId();

    const userDatabase: any = new UserDatabase();
    await userDatabase.createUser(
      id,
      userData.name,
      userData.email,
      hashPassword
    );

    const tokenManager = new TokenManager();
    const token = tokenManager.generateToken({ id });

    res.status(200).send({ token });
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
