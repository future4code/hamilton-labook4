export class Post {
  constructor(
    private id: string,
    private picurl: string,
    private description: string,
    private createDate: number | string,
    private userId: string,
    private type: PostType
  ) {}

  public getId(): string {
    return this.id;
  }

  public getPicurl(): string {
    return this.picurl;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCreateDate(): number | string {
    return this.createDate;
  }

  public getUserId(): string {
    return this.userId;
  }

  public getType(): PostType {
    return this.type;
  }
}

export enum PostType {
  NORMAL = "normal",
  EVENTO = "evento",
}

export const toUserType = (value: string): PostType => {
  switch (value) {
    case "normal":
      return PostType.NORMAL;
    case "evento":
      return PostType.EVENTO;
    default:
      return PostType.NORMAL;
  }
};
