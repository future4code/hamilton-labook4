import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";
import { PostsDatabase } from "../data/PostsDatabase";

export const getPostsFriends = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization as string;
    const tokenManager = new TokenManager();
    const tokenData = tokenManager.retrieveDataFromToken(token);

    const postDataBase = new PostsDatabase();
    const feedPosts = await postDataBase.getFeed(tokenData.id);

    res.status(200).send({
      feedPosts,
    });
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
