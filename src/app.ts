import "dotenv/config";

import express, { type Application } from 'express';
import globals from './globals.js';
import userRouter from "./routes/userRouter.js";
import indexRouter from "./routes/indexRouter.js";
import authRouter from "./routes/authRouter.js";
import passport from "./configs/passport.js";
import handleError from "./controllers/errorController.js";
import usersRouter from "./routes/usersRouter.js";


const app: Application = express();
app.use(express.json());

app.use(passport.initialize());

app.get('/', indexRouter);
app.use('/currentUser', userRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.use(handleError);

app.listen(globals.PORT, (err?: Error) => {
    if(err) throw err;

    console.log(`Listening to port: ${globals.PORT}`);
});