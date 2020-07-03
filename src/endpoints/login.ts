import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    if (!userData.email || !userData.password) {
      throw new Error("Preencha os campos");
    }

    const userDatabase: any = new UserDatabase();
    const user = await userDatabase.getUserEmail(userData.email);

    if (!user) {
      throw new Error("Email invalido");
    }

    const hashManager = new HashManager();
    const checkHash = await hashManager.compareHash(
      userData.password,
      user.password
    );

    if (!checkHash) {
      throw new Error("Email ou senha invalidos.");
    }

    const tokenManager = new TokenManager();
    const token = tokenManager.generateToken({
      id: user.id,
    });

    res.status(200).send({ token });
  } catch (err) {
    res.status(402).send({
      message: err.message,
    });
  }
};
