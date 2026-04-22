import { Router, type Request, type Response } from "express";

const indexRouter = Router();

indexRouter.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'welcome to neon rift server',
    });
});

export default indexRouter;