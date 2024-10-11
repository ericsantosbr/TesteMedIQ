import { DiscussionData, DiscussionPostData, GroupData, uploadDiscussion, uploadDiscussionPost, uploadNewGroup } from "../helpers/DBHelpers";
import { Hono } from "hono";
import { jsonDiscussionPostValidator, jsonDiscussionValidator } from "../helpers/Validators";

export const app = new Hono();

app.post('/createPost', jsonDiscussionValidator, async (c) => {
    const { requestBody } = c.req.valid('json');

    const discussionData: DiscussionData = {
        groupID: requestBody.groupID,
        title: requestBody.title,
        message: requestBody.message,
        ownerID: 9
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

app.get('/postResponses', (c) => {
    return c.text('Teste');
});

app.post('/createPostResponse', jsonDiscussionPostValidator, async(c) => {
    const { requestBody } = c.req.valid('json');

    const discussionData: DiscussionPostData = {
        postID: requestBody.postID,
        ownerID: 9,
        message: requestBody.message
    }

    const uploadResult = await uploadDiscussionPost(discussionData);
    console.debug(uploadResult);


    return c.text('Teste', 200);
});