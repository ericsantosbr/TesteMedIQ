import { db } from "../database";
import { UserData } from "./Auth";

export async function fetchUserAuthData (email: string) {
    const foundValue = await db.selectFrom('MedIQ.users')
        .select(['id', 'email', 'password'])
        .where('email', '=', email)
        .execute()
        .then((a) => {
            console.log('Found Values: ');
            console.debug(a);

            return a;
        });
        

    return foundValue;
}

export async function uploadNewUser (userData: UserData) {
    const uploadResult = await db.insertInto('MedIQ.users')
        .values({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        .execute()
        .catch((e) => {
            return e;
        });
    
    return uploadResult;
}