import { PostsDatabase } from "../data/PostsDatabase";
import { Post, toUserType } from "../models/Post";

export class PostBusiness {
  async createPost(
    id: string,
    picurl: string,
    description: string,
    postDate: number,
    userId: string,
    type: string
  ) {
    if (!picurl || !description || !type) {
      throw new Error("Preencha todos os campos");
    }

    const post = new Post(
      id,
      picurl,
      description,
      postDate,
      userId,
      toUserType(type)
    );

    await new PostsDatabase().newPost(post);
  }

  async getPostType(type: string) {
    const postDataBase = new PostsDatabase();
    const postType = await postDataBase.getFeedType(toUserType(type));

    return postType;
  }
  async getFeed(id: string) {
    const postDataBase = new PostsDatabase();
    const feedPosts = await postDataBase.getFeed(id);

    return feedPosts;
  }
}
