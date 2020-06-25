import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";
import { PostsDatabase } from "../data/PostDatabase";
import  moment from "moment";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization as string;

    const postData = {
      picurl: req.body.picurl,
      description: req.body.description,
      type: req.body.type,
    };

    if (!postData.picurl || !postData.description || !postData.type) {
      throw new Error("Preencha todos os campos");
    }

    if (postData.type !== "normal" && postData.type !== "evento") {
      throw new Error("Post invalido.");
    }

    const postDate: number = moment.now();

    const tokenManager = new TokenManager();
    const tokenData = tokenManager.retrieveDataFromToken(token);

    const idGenerator: any = new IdGenerator();
    const id: string = idGenerator.generateId();

    const newPostsDatabase = new PostsDatabase();
    // await newPostsDatabase.newPost(
    //   id,
    //   postData.picurl,
    //   postData.description,
    //   postDate,
    //   tokenData.id,
    //   postData.type
    // );

    res.status(200).send({
      sucess: "Post criado com sucesso.",
    });
  } catch (err) {
    res.status(402).send({
      messager: err.message,
    });
  }
};
