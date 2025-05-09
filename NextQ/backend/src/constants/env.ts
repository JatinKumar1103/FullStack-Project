import dotenv from "dotenv"
dotenv.config();
const getEnv = (key: string , defaultValue?: string): string => {
    const value = process.env[key] || defaultValue;
    if(value === undefined){
        throw new Error(`Missing environment variable ${key}`);
    }
    return value;
};
export const ACCESS_TOKEN_EXPIRY = getEnv("ACCESS_TOKEN_EXPIRY");
export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");


 