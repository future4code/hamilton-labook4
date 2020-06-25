import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { User } from "../models/User";

export class UserBusiness {
  public async signup(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    if (!id || !name || !email || !password) {
      throw new Error("invalid input");
    }

    const hashPassword = await new HashManager().generateHash(password);

    const user = new User(id, name, email, hashPassword);

    await new UserDatabase().createUser(user);
  }

  public async login(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Preencha os campos");
    }

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserEmail(email);

    if (!user) {
      throw new Error("Email ou senha incorreta.");
    }

    const hashManager = new HashManager();
    const checkHash = await hashManager.compareHash(
      password,
      user.getPassword()
    );

    if (!checkHash) {
      throw new Error("Email ou senha incorreta.");
    }

    return user.getId();
  }
}
