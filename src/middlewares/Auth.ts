import { Context } from "hono";
import { db } from "../database";
import { bearerAuth } from "hono/bearer-auth";
import { createClient } from "redis";
import { config } from "dotenv";

config();

export const verifyAuthenticatedUser = bearerAuth({ verifyToken: async (token, c) => {
    const redisUser = process.env.REDIS_USERNAME;
    const redisPassword = process.env.REDIS_PASSWORD;
    const redisHostname = process.env.REDIS_HOSTNAME;
    const redisPort = process.env.REDIS_PORT;
    const redisBearerLifetime = process.env.REDIS_BEARER_TOKEN_LIFETIME;

    const redisURL = 'redis://' + (redisUser ? redisUser + ':' + redisPassword + '@' : '') + redisHostname + ':' + redisPort;

    
    const client = await createClient({
        url: 'redis://' + (redisUser ? redisUser + ':' + redisPassword + '@' : '') + redisHostname + ':' + redisPort
    })
    .on('error', err => console.debug(err))
    .connect();
    
    const foundKey = await client.get(token);
    
    // If left value is undefined or null, it evaluates to the value on its right
    if (foundKey ?? false) {
        return true;
    } else {
        return false;
    }
}})