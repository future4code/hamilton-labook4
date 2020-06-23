import { BaseDataBase } from "./BaseDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { User } from "../models/User";

export class UserDatabase extends BaseDataBase {
    tableName: string = "Labook_users";

    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string) {
        try {
            const id = this.idGenerator.generate();
            await super.getConnection().raw(`
             INSERT INTO Labook_users(id, name, email, password)
             VALUES
                 (
                "${id}",
                "${name}",
                "${email}",
                "${password}"
                )
                `);                
            } catch (err) {
                throw new Error(err.message);
            }
    }

};