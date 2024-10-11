import { DiscussionData, DiscussionPostData, getPostResponses, GroupData, uploadDiscussion, uploadDiscussionPost, uploadNewGroup } from "../helpers/DBHelpers";
import { Hono } from "hono";
import { jsonDiscussionPostValidator, jsonDiscussionValidator } from "../helpers/Validators";
import { verifyAuthenticatedUser } from "../middlewares/Auth";

type HonoVariables = {
    userID: number;
    userEmail: string;
    username: string;
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
    console.debug(uploadResult);

    
    return c.text('Teste', 200);
});

app.post('/createGroup/:groupName', async (c) => {
    const groupName = c.req.param('groupName');

    const groupData: GroupData = {
        name: groupName,
        creatorID: 9
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

app.post('/createPostResponse', verifyAuthenticatedUser, jsonDiscussionPostValidator, async(c) => {
    const { requestBody } = c.req.valid('json');

    const discussionData: DiscussionPostData = {
        postID: requestBody.postID,
        ownerID: 9,
        message: requestBody.message
    }

    const uploadResult = await uploadDiscussionPost(discussionData);

    return c.text('Teste', 200);
});