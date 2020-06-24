import { BaseDatabase } from "./BaseDatabase";
import * as moment from "moment";
import { Post, PostType } from "../models/Post";

export class PostsDatabase extends BaseDatabase {
  static TABLE_NAME = "Posts";

  private toModel(dbResult?: any): Post | undefined {
    return (
      dbResult &&
      new Post(
        dbResult.id,
        dbResult.picurl,
        dbResult.description,
        moment.unix(dbResult.create_date / 1000).format("DD/MM/YY"),
        dbResult.user_id,
        dbResult.type
      )
    );
  }

  public async newPost(post: Post): Promise<void> {
    await this.setConnection()
      .insert({
        id: post.getId(),
        picurl: post.getPicurl(),
        description: post.getDescription(),
        create_date: post.getCreateDate(),
        user_id: post.getUserId(),
        type: post.getType(),
      })
      .into(PostsDatabase.TABLE_NAME);
  }

  public async getFeed(id: string): Promise<Post[]> {
    const result = await this.setConnection().raw(`
    SELECT * FROM Posts p
    JOIN friends f ON f.friendreceiver_id = p.user_id
    WHERE f.friendsender_id = "${id}" 
    ORDER BY p.create_date DESC`);
    console.log(id);
    return result[0].map((post: any) => {
      return this.toModel(post);
    }) as Post[];
  }

  public async getFeedType(type: PostType): Promise<Post[]> {
    const result = await this.setConnection()
      .select("*")
      .from(PostsDatabase.TABLE_NAME)
      .where({ type })
      .orderBy("create_date", "desc");
    return result.map((post) => {
      return this.toModel(post);
    }) as Post[];
  }

  public async verifyPostId(id: string): Promise<any> {
    const response = await this.setConnection()
      .select("id")
      .from(PostsDatabase.TABLE_NAME)
      .where({ id });
    return response[0];
  }
}
