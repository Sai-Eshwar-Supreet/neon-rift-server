import passport from "passport";
import {ExtractJwt, Strategy as JWTStrategy, type StrategyOptionsWithSecret, type VerifyCallback, type VerifiedCallback} from "passport-jwt";
import globals from "../globals.js";
import prisma from "../db/prisma.js";

interface JWTPayload{
    id: number,
    username: string
}

const opts : StrategyOptionsWithSecret = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: globals.JWT_SECRET
}

const verifyCallback: VerifyCallback = async (payload: JWTPayload , done: VerifiedCallback) =>{
    try{
        const player = await prisma.player.findUniqueOrThrow({
            where: {id: payload.id}
        });

        if(!player){
            return done(null, false);
        }

        return done(null, player);
    }
    catch(err){
        done(err, false);
    }
}

passport.use(new JWTStrategy(opts, verifyCallback))

export default passport;