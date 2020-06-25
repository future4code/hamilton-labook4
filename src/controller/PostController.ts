import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";
import * as moment from "moment";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const { picurl, description, type } = req.body;

      const token = req.headers.authorization as string;

      const tokenManager = new TokenManager();
      const tokenData = tokenManager.retrieveDataFromToken(token);

      const idGenerator: any = new IdGenerator();
      const id: string = idGenerator.generateId();

      const postDate: number = moment.now();

      await new PostBusiness().createPost(
          id,
          picurl,
          description,
          postDate,
          tokenData.id,
          type
      );
    } catch (err) {
      res.status(402).send({
        messager: err.message,
      });
    }
  }

  async getPostsType(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const type = req.body.type;

      const tokenManager = new TokenManager();
      tokenManager.retrieveDataFromToken(token);

      const postType = await new PostBusiness().getPostType(type);

      res.status(200).send({
        postType,
      });
    } catch (err) {
      res.status(402).send({
        messager: err.message,
      });
    }
  }

  async getFeed(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const tokenManager = new TokenManager();
      const tokenData = tokenManager.retrieveDataFromToken(token);

      const feedPosts = await new PostBusiness().getFeed(tokenData.id);

      res.status(200).send({
        feedPosts,
      });
    } catch (err) {
      res.status(402).send({
        messager: err.message,
      });
    }
  }
}
