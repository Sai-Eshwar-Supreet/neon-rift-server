import { Router, type NextFunction, type Request, type Response } from "express";
import prisma from "../db/prisma.js";

const userRouter = Router();

userRouter.get('/stats', async (req: Request, res: Response, next: NextFunction) => {
    try{

    }
    catch(err){
        return next(err)
    }
    const players = await prisma.player.findMany({
        select: {
            id: true,
            username: true
        }
    });

    res.status(200).json({
        players
    });
});

export default userRouter;