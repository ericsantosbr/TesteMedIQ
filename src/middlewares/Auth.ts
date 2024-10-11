import { Context } from "hono";
import { db } from "../database";
import { bearerAuth } from "hono/bearer-auth";
import { createClient } from "redis";
import { config } from "dotenv";
import { fetchBearerTokenFromAuthServer } from "../helpers/Auth";

config();

export const verifyAuthenticatedUser = bearerAuth({ verifyToken: async (token, c) => {
    const foundKeyData = await fetchBearerTokenFromAuthServer(token);
    
    // If left value is undefined or null, it evaluates to the value on its right
    if (!!foundKeyData) {
        const parsedFoundKeyData = JSON.parse(foundKeyData);

        c.set('userID', parsedFoundKeyData.id);
        c.set('username', parsedFoundKeyData.username);
        c.set('userEmail', parsedFoundKeyData.email);

        return true;
    } else {
        return false;
    }
}});