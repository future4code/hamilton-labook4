import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { User } from "../models/User";

export class UserDatabase extends BaseDataBase {
    static TABLE_NAME: string = "Labook_users";

    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string) {
        try {
            const user_id = this.idGenerator.generate();

            await super.getConnection().raw(`
             INSERT INTO Labook_users(user_id, name, email, passwogit rd)
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

    public async getUserById(user_id: string) {
        try {
            const result = await super.getConnection().raw(`
                SELECT * FROM Labook_users
                WHERE user_id = "${user_id}"
            `)
            return result[0]
        }catch(err) {
            throw new Error(err.message);
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

    public async getUserByEmail(email:string):Promise<any>{
        try {
            const result = await this.getConnection()
            .select("*").from(UserDatabase.TABLE_NAME).where({
                email
            })
           
            return result[0]
        }catch(err) {
            throw new Error(err.message)
        }
        
    }

};

