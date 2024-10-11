import { Hono } from "hono";
import { getUserData } from "../helpers/DBHelpers";
import { verifyAuthenticatedUser } from "../middlewares/Auth";

type HonoVariables = {
    userID: number;
    userEmail: string;
    username: string;
    privileges: string;
}

export const app = new Hono<{ Variables: HonoVariables }>();

app.get('/userData/:userID', verifyAuthenticatedUser, async (c) => {
    const userID = Number(c.req.param('userID'));

    const userData = await getUserData(userID);

    let result;
    if (
        (!!userData && userData.length > 0 && userData[0].id === Number(c.get('userID'))) ||
        (c.get('privileges') === 'MODERATOR' || c.get('privileges') === 'ADMIN')
    ) {
        result = userData[0];
    } else {
        return c.text('User not found', 404);
    }

    return c.json(result);
});
