import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { User } from "../models/User";

export class UserDatabase extends BaseDataBase {
    tableName: string = "Labook_users";

    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string) {
        try {
            const user_id = this.idGenerator.generate();

            await super.getConnection().raw(`
             INSERT INTO Labook_users(user_id, name, email, password)
             VALUES
                 (
                "${user_id}",
                "${name}",
                "${email}",
                "${password}"
                )
                `);                
            } catch (err) {
                throw new Error(err.message);
            }
    }

    public async getUserByEmail(email: string): Promise<any> {
        try{
            const result = await this.getConnection()
                .select("*")
                .from("Labook_users")
                .where({ email });
            return result[0];
        }catch (err){
            throw new Error(err.message)
        }
        
    }

    public async friendship(user_id: string,  friend_id: string) {
        try {
            await super.getConnection().raw(
            `
                INSERT INTO Labook_friendship(user_id, friend_id)
                VALUES (
                    "${user_id}",
                    "${friend_id}"
                )
            `
            )
        } catch(err) {
            throw new Error(err.message)
        }
    }

    public async deleteFriendship(user_id: string,  friend_id: string): Promise<void> {
        try{
            await this.getConnection().raw(`
                DELETE FROM Labook_friendship
                WHERE "${user_id}" AND "${friend_id}"
            `)           
        }catch (err) {
            throw new Error(err.message)
        }       
    }
};

