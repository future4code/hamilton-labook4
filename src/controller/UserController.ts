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

    // async getUserById(req: Request, res: Response) {
    //     const userBusiness: UserBusiness = new UserBusiness();
    //     try {
    //         const id = req.params.id;
    //         const result = await userBusiness.getUserById(id);
    //         res.status(200).send(result);
    //     } catch (err) {
    //         res.status(400).send({ error: err.message });
    //     }

    }
}