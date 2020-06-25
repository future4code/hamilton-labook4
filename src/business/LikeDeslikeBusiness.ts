import { LikeDeslikeDatabase } from "../data/LikeDeslikeDatabase";

export class LikeDeslikeBusiness {
  public async likeDeslike(postId: string, UserId: string) {
    const likeDeslikeDataBase = new LikeDeslikeDatabase();

    const verifyLike = await likeDeslikeDataBase.verify(postId, UserId);

    if (!verifyLike) {
      await likeDeslikeDataBase.addLike(postId, UserId);
      return " added like";
    }

    if (verifyLike) {
      await likeDeslikeDataBase.removeLike(postId, UserId);
      return " removed like";
    }
  }
}
