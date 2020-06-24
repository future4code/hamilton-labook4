import express from "express";
import { PostController } from "../controller/PostController";
import { CommentController } from "../controller/CommentController";
import { LikeDeslikeController } from "../controller/LikeDeslikeController";

export const postRouter = express.Router();

const post = new PostController();

const postComment = new CommentController();

const likeDeslikeManager = new LikeDeslikeController();

postRouter.post("/likeDeslike", likeDeslikeManager.likeDeslike);
postRouter.post("/create", post.createPost);

postRouter.get("/feedtype", post.getPostsType);
postRouter.get("/feed", post.getFeed);
postRouter.get("/comment", postComment.createComment);
