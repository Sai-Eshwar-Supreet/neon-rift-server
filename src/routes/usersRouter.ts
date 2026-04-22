import { Router, type Request, type Response } from "express";
import prisma from "../db/prisma.js";

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
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

export default usersRouter;