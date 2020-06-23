import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness{
    private userDatabase = new UserDatabase();
    private idGenerator = new IdGenerator();

    public async signup(name: string, email: string, password: string ) : Promise<string>{
        const id = this.idGenerator.generate();
        await this.userDatabase.signup(id, name, email, password);
        return id;
    }

    public async approve(id: string){
        await this.userDatabase.approve(id);
    }

    public async getUserById(id: string){
        //return pois é um select
       return await this.userDatabase.getUserById(id);
    }
}