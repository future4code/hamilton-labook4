import { Request, Response } from "express";
import { TokenManager } from "../services/TokenManager";
import { CommentBusiness } from "../business/CommentBusiness";
import { IdGenerator } from "../services/IdGenerator";

export class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const comment = req.body.comment;
      const token = req.headers.authorization as string;
      const postId = req.body.postId;

      if (!comment) {
        throw new Error("input comment empty");
      }
      const userId = new TokenManager().retrieveDataFromToken(token).id;

      const commentId = new IdGenerator().generateId();

      await new CommentBusiness().createComment(
        comment,
        userId,
        postId,
        commentId
      );

      res.status(200).send({ messagem: "Comentário adicionado com sucesso" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}
