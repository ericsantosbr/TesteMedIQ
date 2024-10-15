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
        .select(['id', 'email', 'username', 'password', 'privileges'])
        .where('email', '=', email)
        .execute();
        

    return foundValue;
}

export async function uploadNewUser (userData: UserData) {
    const uploadResult = await db.insertInto('MedIQ.users')
        .values({
            username: userData.username,
            email: userData.email,
            password: userData.password,
            created_at: new Date(Date.now()).toISOString(),
            updated_at: new Date(Date.now()).toISOString(),
            privileges: 'USER',
            is_active: true
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
            updated_at: new Date(Date.now()).toISOString(),
            is_active: true
        })
        .returning(['id', 'title', 'created_at', 'group_id'])
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
            updated_at: new Date(Date.now()).toISOString(),
            is_active: true
        })
        .returning(['id', 'message', 'created_at'])
        .execute();

    return uploadResult;
}

export async function getPost (postID: number) {
    const foundPost = await db.selectFrom('MedIQ.discussions')
        .where('id', '=', postID)
        .selectAll()
        .execute() || null;
    
    return foundPost;
}

export async function getPostResponses (postID: number) {
    const foundValues = await db.selectFrom('MedIQ.discussion_posts')
        .where('post_id', '=', postID)
        .innerJoin('MedIQ.users', 'MedIQ.users.id', 'MedIQ.discussion_posts.user_id')
        .select(['message', 'MedIQ.discussion_posts.created_at','MedIQ.users.username', 'MedIQ.users.email', 'MedIQ.users.id'])
        .orderBy('MedIQ.discussion_posts.created_at', 'asc')
        .execute();
    
    console.debug(foundValues);

    return foundValues;
}

export async function modifyPostResponse (postID: number, postMessage: string) {
    const updateResult = await db.updateTable('MedIQ.discussion_posts')
        .set({
            message: postMessage,
            updated_at: new Date(Date.now())
        })
        .where('MedIQ.discussion_posts.id', '=', postID)
        .execute();

    return updateResult;
}

export async function fetchPostResponse (postID: number) {
    const searchResult = await db.selectFrom('MedIQ.discussion_posts')
        .selectAll()
        .where('MedIQ.discussion_posts.id', '=', postID)
        .execute();

    return searchResult;
}

export async function deletePostLogically (postID: number) {
    const deleteResult = await db.updateTable('MedIQ.discussions')
        .where('id', '=', postID)
        .set({
            is_active: false,
            updated_at: new Date(Date.now())
        })
        .returning('id')
        .execute()
    
    return deleteResult;
}

export async function deletePostResponseLogically (postID: number) {
    const deleteResult = await db.updateTable('MedIQ.discussion_posts')
        .where('id', '=', postID)
        .set({
            is_active: false,
            updated_at: new Date(Date.now())
        })
        .returning('id')
        .execute()
    
    return deleteResult;
}

export async function deleteUserLogically (userID: number) {
    const deleteResult = await db.updateTable('MedIQ.users')
        .set({
            is_active: false,
            updated_at: new Date(Date.now())
        })
        .where('MedIQ.users.id', '=', userID)
        .returning(['id', 'is_active', 'updated_at'])
        .execute()
        .then((a) => {return a});
    
    return deleteResult;
}

export async function getUserData (userID: number) {
    const deleteResult = await db.selectFrom('MedIQ.users')
        .selectAll()
        .where('MedIQ.users.id', '=', userID)
        .execute();
    
    return deleteResult;
}
