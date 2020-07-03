import { Request, Response } from "express";
import { TokenManager } from "../services/TokenManager";
import { LikeDeslikeBusiness } from "../business/LikeDeslikeBusiness";

export class LikeDeslikeController {
  public async likeDeslike(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      const postId = req.body.postId;

      if (!token || !postId) {
        throw new Error("Campo Vazio");
      }

      const userId = new TokenManager().retrieveDataFromToken(token).id;
      const response = await new LikeDeslikeBusiness().likeDeslike(
          postId,
          userId
      );

      res.status(200).send({ message: response });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
