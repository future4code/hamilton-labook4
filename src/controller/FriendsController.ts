import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";
import { FriendsBusiness } from "../business/FriendsBusiness";

export class FriendsController {
  async createFriendship(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const friendData = {
        friendReceiverId: req.body.friendReceiverId,
      };

      const tokenManager = new TokenManager();
      const tokenData = tokenManager.retrieveDataFromToken(token);

      await new FriendsBusiness().createFriendship(
          friendData.friendReceiverId,
          tokenData.id
      );

      res.status(200).send({
        sucess: "Amizade criada com sucesso!",
      });
    } catch (err) {
      res.status(402).send({
        messager: err.message,
      });
    }
  }
  async deleteFriendship(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;

      const friendData = {
        friendReceiverId: req.body.friendReceiverId,
      };

      const tokenManager = new TokenManager();
      const tokenData = tokenManager.retrieveDataFromToken(token);

      await new FriendsBusiness().deleteFriendship(
          friendData.friendReceiverId,
          tokenData.id
      );

      res.status(200).send({
        sucess: "Amizade deletada com sucesso!",
      });
    } catch (err) {
      res.status(402).send({
        messager: err.message,
      });
    }
  }
}
