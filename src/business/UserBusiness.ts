import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness{
    private userDatabase = new UserDatabase();
    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string ) : Promise<string>{
        const id = this.idGenerator.generate();
        wait this.userDatabase.signup(name, email, password);
        return id;
    }

    public async friendship(user_id: string, friend_id: string): Promise<any> {
        await this.userDatabase.friendship(user_id, friend_id);
    }
   
};


    public async login(email: string) {
        await this.userDatabase.getUserByEmail(email);
    }
    }

    // public async approve(id: string){
    //     await this.userDatabase.approve(id);
    // }

    // public async getUserById(user_id: string){
    //    return await this.userDatabase.getUserById(user_id);
    // }

