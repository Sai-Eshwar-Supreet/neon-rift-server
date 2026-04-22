import { Router, type NextFunction, type Request, type Response } from "express";
import { loginValidator, signupValidator } from "../validators/formValidators.js";
import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import globals from "../globals.js";
import prisma from "../db/prisma.js";
import jwt from 'jsonwebtoken';

const authRouter = Router();

authRouter.post('/signup', signupValidator, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
            return res.status(400).json({
                messages: errors.array().map(e => e.msg)
            });
        }
    
        const data : {username:string, password: string } = matchedData(req);
    
        const passwordHash = await bcrypt.hash(data.password, globals.SALT_ROUNDS);
        
        await prisma.player.create({
            data: {
                username: data.username,
                passwordHash,
                playerStats: {
                    create: {}
                }
            }
        });
    
        return res.status(200).json({
            messages: [`${data.username} successfully signed in`]
        });
    }
    catch(err){
        return next(err);
    }
});

authRouter.post('/login', loginValidator, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({
                messages: errors.array().map(e => e.msg)
            });
        }
        
        const data : {username:string, password: string } = matchedData(req);

        const player = await prisma.player.findUniqueOrThrow({
            where: {username: data.username}
        });

        if(!player){
            return  res.status(400).json({messages: ['Username or password is invalid.']});
        }
        
        const match = await bcrypt.compare(data.password, player.passwordHash);
        
        if(!match){
            return  res.status(400).json({messages: ['Username or password is invalid.']});
        }

        const token = jwt.sign({id: player.id, username: player.username}, globals.JWT_SECRET, {expiresIn: '1h'} );

        return res.status(200).json({
            messages: ["Login successful"],
            token
        });
    }
    catch(err){
        return next(err);
    }
});

export default authRouter;