import { FriendsDatabase } from "../data/FriendsDatabase";
import { UserDatabase } from "../data/UserDatabase";

export class FriendsBusiness {
    async createFriendship(friendReceiverId: string, userId: string) {
        const user = await new UserDatabase().getUserId(userId);

        const friend = await new UserDatabase().getUserId(friendReceiverId);

        if (!user || !friend) {
            throw new Error("Usuários não encontrado");
        }

        const friendRequest = new FriendsDatabase();
        const friendCheck = await friendRequest.checkFriendship(
            userId,
            friendReceiverId
        );
        if (friendCheck) {
            throw new Error("Amizade já existente.");
        }
        await friendRequest.createFriendship(userId, friendReceiverId);
    }

    async deleteFriendship(friendReceiverId: string, userId: string) {
        const user = await new UserDatabase().getUserId(userId);

        const friend = await new UserDatabase().getUserId(friendReceiverId);

        if (!user || !friend) {
            throw new Error("Usuários não encontrado");
        }

        const friendRequest = new FriendsDatabase();
        const friendCheck = await friendRequest.checkFriendship(
            userId,
            friendReceiverId
        );
        if (!friendCheck) {
            throw new Error("Amizade não existente.");
        }
        await friendRequest.deleteFriendship(userId, friendReceiverId);
    }
}
