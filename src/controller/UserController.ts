import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupInputDTO } from "../dto/UserDTO";

const userBusiness: UserBusiness = new UserBusiness();
const authenticator = new Authenticator();

export class UserController {
    async signup(req: Request, res: Response) {      
        try {

            if (!req.body.email || req.body.email.indexOf("@") === -1) {
                throw new Error("Invalid email");
            }

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

            const authenticationData =  authenticator.getData(token);

            const { user_id } = req.params;
            const { friend_id } = req.body;

            await userBusiness.friendship(user_id, friend_id);

            res.status(200).send({ message: "Solicitação de amizade enviada com sucesso!" })
        } catch(err) {
            res.status(400).send({ error: err.message });
        }
    }

};

