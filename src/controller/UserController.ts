import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { SignupInputDTO } from "../dto/UserDTO";


export class UserController {
    async signup(req: Request, res: Response) {
        const userBusiness: UserBusiness = new UserBusiness();
        try {
            const userData: SignupInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
            
            const hashManager = new HashManager();
            const hashPassword = await hashManager.hash(userData.password);

            const id = await userBusiness.signup(userData.name, userData.email, hashPassword);

            const authenticator = new Authenticator();

            const accessToken = authenticator.generateToken({
                id: id                
            });

            res.status(200).send({ accessToken });

        } catch (err) {
            res.status(400).send({ error: err.message });
        }
    }

};