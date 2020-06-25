import { BaseDatabase } from "./BaseDatabase";

export class FriendsDatabase extends BaseDatabase {
  public static TABLE_NAME = "Labook_friendship";

  public async createFriendship(
    idSender: string,
    idReceiver: string
  ): Promise<void> {
    await this.setConnection()
      .insert({
        friendsender_id: idSender,
        friendreceiver_id: idReceiver,
      })
      .into(FriendsDatabase.TABLE_NAME);

    await this.setConnection()
      .insert({
        friendsender_id: idReceiver,
        friendreceiver_id: idSender,
      })
      .into(FriendsDatabase.TABLE_NAME);
  }

  public async deleteFriendship(
    idSender: string,
    idReceiver: string
  ): Promise<void> {
    await this.setConnection()
      .delete()
      .from(FriendsDatabase.TABLE_NAME)
      .where({ friendsender_id: idSender, friendreceiver_id: idReceiver })
      .orWhere({
        friendsender_id: idReceiver,
        friendreceiver_id: idSender,
      });
  }

  public async checkFriendship(
    idSender: string,
    idReceiver: string
  ): Promise<any> {
    const result = await this.setConnection()
      .select("*")
      .from(FriendsDatabase.TABLE_NAME)
      .where({
        friendsender_id: idSender,
        friendreceiver_id: idReceiver,
      });
    return result[0];
  }
}
