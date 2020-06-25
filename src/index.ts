import dotenv from "dotenv";
import { AddressInfo } from "net";
import express from "express";
import { login } from "./endpoints/login";
import { createFriendship } from "./endpoints/friendrequest";
import { createPost } from "./endpoints/createpost";
import { getPostsFriends } from "./endpoints/getPostFriends";
import { getPostsType } from "./endpoints/getPostTypes";
import { userRouter } from "./router/UserRouter";
import { UserController } from "./controller/UserController";
import { postRouter } from "./router/PostRouter";
import {friendshipRouter} from "./router/FriendshipRoute";


dotenv.config();
const app = express();
app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

app.use("/user", userRouter);
app.use("/post/", postRouter);
app.use("/", friendshipRouter);

app.post("/friendrequest", createFriendship);
app.post("/createpost", createPost);

app.get("/post/feed", getPostsFriends);
app.get("/post/feedtype", getPostsType);
//