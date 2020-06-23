import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness{
    private userDatabase = new UserDatabase();
    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string ) : Promise<string>{
        const id = this.idGenerator.generate();
        await this.userDatabase.signup(name, email, password);
        return id;
    }

    public async friendship(user_id: string, friend_id: string): Promise<any> {
        await this.userDatabase.friendship(user_id, friend_id);
    }
   
};

