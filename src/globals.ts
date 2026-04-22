const PORT: number = Number(process.env.PORT) || 8080;
const DATABASE_URL: string =  process.env.DATABASE_URL as string;
const JWT_SECRET: string  = process.env.JWT_SECRET as string;
const SALT_ROUNDS: number = Number(process.env.SALT_ROUNDS);
const env: string | undefined = process.env.ENVIRONMENT; 

if(env !== 'development' && env !== 'production'){
    throw new Error("Invalid ENVIRONMENT value");
}

const ENVIRONMENT: "development" | "production" = env;
const IS_PRODUCTION = ENVIRONMENT === 'production';

function checkAndExit(value: string | undefined, errMessage: string) : void{
    if(!value){
        throw new Error(errMessage);
    }
}

checkAndExit(DATABASE_URL, 'Database URL not found in the environment variables');
checkAndExit(JWT_SECRET, 'JWT secret not found in the environment variables');

const globals = {
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    SALT_ROUNDS,
    ENVIRONMENT,
    IS_PRODUCTION
};

export default globals;