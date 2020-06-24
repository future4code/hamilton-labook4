import { BaseDatabase } from "./BaseDatabase";
import { Comment } from "../models/Comment";

export class CommentDatabase extends BaseDatabase {
  private static NAME_TABLE = "Comments";

  public async createComment(comment: Comment): Promise<void> {
    await this.setConnection()
      .insert({
        id: comment.getId(),
        comment: comment.getComment(),
        user_id: comment.getUserId(),
        post_id: comment.getPostId(),
      })
      .into(CommentDatabase.NAME_TABLE);
  }
}
