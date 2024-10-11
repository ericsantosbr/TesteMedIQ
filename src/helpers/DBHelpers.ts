import { db } from "../database";
import { UserData } from "./Auth";

export interface DiscussionData {
    groupID: number,
    message: string,
    title: string,
    ownerID: number
};

export interface DiscussionPostData {
    message: string,
    ownerID: number,
    postID: number
};

export interface GroupData {
    creatorID: number,
    name: string,
}

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

export async function uploadNewGroup (groupData: GroupData) {
    const uploadResult = await db.insertInto('MedIQ.groups')
        .values({
            creator_id: groupData.creatorID,
            name: groupData.name,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        .execute()
        .catch((e) => {
            return e;
        });
    
    return uploadResult;
}

export async function uploadDiscussion (discussionData: DiscussionData) {
    const uploadResult = await db.insertInto('MedIQ.discussions')
        .values({
            message: discussionData.message,
            title: discussionData.title,
            owner_id: discussionData.ownerID,
            group_id: discussionData.groupID,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        .execute();

    return uploadResult;
}

export async function uploadDiscussionPost (discussionPostData: DiscussionPostData) {
    const uploadResult = await db.insertInto('MedIQ.discussion_posts')
        .values({
            post_id: discussionPostData.postID,
            user_id: discussionPostData.ownerID,
            message: discussionPostData.message,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString()
        })
        .execute();

    return uploadResult;
}