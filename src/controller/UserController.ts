import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserController {
    async signup(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;

            const id = new IdGenerator().generateId();

            await new UserBusiness().signup(id, name, email, password);

            const token = new TokenManager().generateToken({ id });

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const result = await new UserBusiness().login(email, password);

            const token = new TokenManager().generateToken({ id: result });

            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}
