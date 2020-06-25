import { Comment } from "../models/Comments";
import { CommentDatabase } from "../data/CommentDatabase";
import { PostsDatabase } from "../data/PostDatabase";

export class CommentBusiness {
  async createComment(
      comment: string,
      userId: string,
      postId: string,
      commentId: string
  ) {
    const verifyPostId = await new PostsDatabase().verifyPostId(postId);

    if (!verifyPostId) {
      throw new Error(" Post ID Invalido!");
    }

    //const commentData = new Comment(commentId, comment, userId, postId);

    const commentDatabase = new CommentDatabase();

    //await commentDatabase.createComment(commentData);
  }
}
