import { BaseDatabase } from "./BaseDatabase";

export class LikeDeslikeDatabase extends BaseDatabase {
  private static TABLE_NAME = "PostLikeRelation";
  async addLike(postId: string, userId: string): Promise<void> {
    await this.setConnection()
      .insert({
        post_id: postId,
        user_id: userId,
      })
      .into(LikeDeslikeDatabase.TABLE_NAME);
  }

  async removeLike(postId: string, userId: string): Promise<void> {
    await this.setConnection()
      .delete()
      .from(LikeDeslikeDatabase.TABLE_NAME)
      .where({
        post_id: postId,
        user_id: userId,
      });
  }

  async verify(postId: string, userId: string): Promise<any> {
    const response = await this.setConnection()
      .select("*")
      .from(LikeDeslikeDatabase.TABLE_NAME)
      .where({
        post_id: postId,
        user_id: userId,
      });

    return response[0];
  }
}
