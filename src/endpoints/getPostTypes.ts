import { TokenManager } from "../services/TokenManager";
import { Request, Response } from "express";
import { PostsDatabase } from "../data/PostDatabase";

export const getPostsType = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const token = req.headers.authorization as string;
        const type = req.body.type;
        const tokenManager = new TokenManager();
        tokenManager.retrieveDataFromToken(token);

        if (type !== "normal" && type !== "evento") {
            throw new Error("Tipo inválido!");
        }

        const postDataBase = new PostsDatabase();
        const postType = await postDataBase.getFeedType(type);

        res.status(200).send({
            postType,
        });
    } catch (err) {
        res.status(402).send({
            messager: err.message,
        });
    }
};
