import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupInputDTO } from "../dto/UserDTO";
import { userRouter } from "../router/UserRouter";
import { UserDatabase } from "../data/UserDatabase";

const userBusiness: UserBusiness = new UserBusiness();
const authenticator = new Authenticator();
const userDatabase = new UserDatabase();

export class UserController {
    async signup(req: Request, res: Response) {
      
        try {
            const userData: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(userData.password);

            const id = await userBusiness.signup(userData.name, userData.email, hashPassword);

            const accessToken = authenticator.generateToken({
                id: id                
            });

            res.status(200).send({ accessToken });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

    async friendship(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;

            authenticator.getData(token);

            const { user_id } = req.params;
            const { friend_id } = req.body;

            await userBusiness.friendship(user_id, friend_id);

            res.status(200).send({ message: "Solicitação de amizade enviada com sucesso!" })
        } catch(err) {
            res.status(400).send({ error: err.message });
        }
    }


    async login(req: Request, res: Response) {
        try {
            if (!req.body.email || req.body.email.indexOf("@") === -1) {
                throw new Error("Invalid email");
            }
            const userData = {
                email: req.body.email,
                password: req.body.password
            }
        
            const user = await userDatabase.getUserByEmail(userData.email);

            const hashManager = new HashManager()
            const comparePassword = await hashManager.compare(userData.password, user.password)

            if(!comparePassword ){
                throw new Error("Invalid Password!")
            }

            const token = authenticator.generateToken({
                id:user.id
            })
            
            res.status(200).send({
                token
            });
        } catch (err) {
            res.status(400).send({
                message: err.message
             });
        }
    }

}


    // async approve(req: Request, res: Response) {
    //     const userBusiness: UserBusiness = new UserBusiness();
    //     try {
    //         const id = req.body.id

    //         await userBusiness.approve(id);

    //         res.status(200).send({ message: "Usuário aprovado" });

    //     } catch (err) {
    //         res.status(400).send({ error: err.message });
    //     }
    // }

    //  async getUserById(req: Request, res: Response) {
    //      try {
    //        const id = req.params.id;
    //         const result = await userBusiness.getUserById(id);
    //         res.status(200).send(result);
    //      } catch (err) {
    //          res.status(400).send({ error: err.message });
    //     }
    // }

};


