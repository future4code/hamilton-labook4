export class Comment {
  private userId: string = ""
  private postId: string = ""

  public getUserId(): string {
    return this.userId;
  }
  
  public getPostId(): string {
    return this.postId;
  }
  
}

