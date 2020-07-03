import express from "express";
import { FriendsController } from "../controller/FriendsController";

export const friendshipRouter = express.Router();

const friendship = new FriendsController();

friendshipRouter.post("/friendrequest", friendship.createFriendship);
friendshipRouter.delete("/friendrequest", friendship.deleteFriendship);
