import {type Request, type Response, type NextFunction, type Errback} from 'express';
import globals from '../globals.js';

function handleError(err: Errback, req: Request, res: Response, next: NextFunction){
    if(res.headersSent){
        return next(err);
    }

    const messages : string[] = globals.IS_PRODUCTION? ['Internal Server Error'] :  err instanceof Error ? [err.message] : ['Unknown error'];

    console.error(err);

    return res.status(500).json({
        status: 500,
        messages
    });
}

export default handleError;