import { deletePostLogically, deletePostResponseLogically, DiscussionData, DiscussionPostData, fetchPostResponse, getPostResponses, GroupData, modifyPostResponse, uploadDiscussion, uploadDiscussionPost, uploadNewGroup } from "../helpers/DBHelpers";
import { Hono } from "hono";
import { jsonDiscussionPostValidator, jsonDiscussionValidator } from "../helpers/Validators";
import { verifyAdminAuthenticated, verifyAuthenticatedUser } from "../middlewares/Auth";

type HonoVariables = {
    userID: number;
    userEmail: string;
    username: string;
    privileges: string;
  }

export const app = new Hono<{ Variables: HonoVariables }>();

app.post('/createPost', verifyAuthenticatedUser,jsonDiscussionValidator, async (c) => {
    const { requestBody } = c.req.valid('json');

    const discussionData: DiscussionData = {
        groupID: requestBody.group_id,
        title: requestBody.title,
        message: requestBody.message,
        ownerID: Number(c.get('userID'))
    }

    const uploadResult = await uploadDiscussion(discussionData);
    
    return c.json(uploadResult, 200);
});

// Only admins can create new discussion groups
app.post('/createGroup/:groupName', verifyAdminAuthenticated, async (c) => {
    const groupName = c.req.param('groupName');

    const groupData: GroupData = {
        name: groupName,
        creatorID: Number(c.get('userID'))
    }

    const uploadResult = await uploadNewGroup(groupData);
    console.debug(uploadResult);
    
    return c.text('Teste', 200);
});

app.get('/postResponses/:postID', async (c) => {
    const postID = Number(c.req.param('postID'));

    const postResponses = await getPostResponses(postID);

    return c.json(postResponses || []);
});

app.patch('/modifyPostResponse', verifyAuthenticatedUser, jsonDiscussionPostValidator, async (c) => {
    const { requestBody } = c.req.valid('json');

    const postResponseData = await fetchPostResponse(requestBody.postID);

    let result;
    if (
        (!!postResponseData && postResponseData.length > 0 && postResponseData[0].user_id === Number(c.get('userID'))) ||
        (c.get('privileges') === 'MODERATOR' || c.get('privileges') === 'ADMIN')
    ) {
        result = modifyPostResponse(Number(requestBody.postID), requestBody.message);

        return c.json(result);
    } else {
        return c.text('Post not found', 404);
    }

});

app.post('/createPostResponse', verifyAuthenticatedUser, jsonDiscussionPostValidator, async(c) => {
    const { requestBody } = c.req.valid('json');

    const discussionData: DiscussionPostData = {
        postID: requestBody.postID,
        ownerID: 9,
        message: requestBody.message
    }

    const uploadResult = await uploadDiscussionPost(discussionData);

    return c.json(uploadResult, 200);
});

app.delete('/deletePostResponse/:postID', verifyAuthenticatedUser, async (c) => {
    const postID = Number(c.req.param('postID'));
    const postResponseData = await fetchPostResponse(postID);

    let result;
    if (
        (!!postResponseData && postResponseData.length > 0 && postResponseData[0].user_id === Number(c.get('userID'))) ||
        (c.get('privileges') === 'MODERATOR' || c.get('privileges') === 'ADMIN')
    ) {
        result = deletePostResponseLogically(postID);

        return c.json(result);
    } else {
        return c.text('Post not found', 404);
    }
});

app.delete('/deletePost/:postID', verifyAuthenticatedUser, async (c) => {
    const postID = Number(c.req.param('postID'));
    const postResponseData = await fetchPostResponse(postID);

    let result;
    if (
        (!!postResponseData && postResponseData.length > 0 && postResponseData[0].user_id === Number(c.get('userID'))) ||
        (c.get('privileges') === 'MODERATOR' || c.get('privileges') === 'ADMIN')
    ) {
        result = deletePostLogically(postID);

        return c.json(result);
    } else {
        return c.text('Post not found', 404);
    }
});