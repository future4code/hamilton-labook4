import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { LikeBusiness } from "../business/LikeBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

const authenticator = new Authenticator()
const likeBusiness = new LikeBusiness()

export class LikeController {

    async likePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { postId } = req.body

            if (postId === undefined || postId === "") {
                throw new Error("Informe Post")
            }

            if(token === undefined || token === ""){
                throw new Error("Usuario não Logado")
            }

            const userId = authenticator.verify(token).id

            const verifyLike = await likeBusiness.verifyLike(userId, postId)
            if (verifyLike !== 0) {
                throw new Error("Curtida já Realizada!")
            }

            await likeBusiness.likePost(userId, postId)

            res.status(200).send({
                message: "Post curtido com sucesso!"
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }

        await BaseDatabase.destroyConnection()
    }
    async unlikePost(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string
            const { postId } = req.body

            if (postId === undefined || postId === "") {
                throw new Error("Informe Post.")
            }

            if(token === undefined || token === ""){
                throw new Error("Deve estar Logado!")
            }

            const userId = authenticator.verify(token).id

            const verifyLike = await likeBusiness.verifyLike(userId, postId)
            if (verifyLike === 0) {
                throw new Error("Post não curtido para descurtir")
            }

            await likeBusiness.unlikePost(userId, postId)

            res.status(200).send({
                message: "Post descurtido !"
            })

        } catch (err) {
            res.status(400).send({
                error: err.message
            })
        }

        await BaseDatabase.destroyConnection()
    }
}