import { validator } from "hono/validator";

export const jsonDiscussionValidator = validator('json', (value, c) => {
    const title = value['title'];
    const message = value['message'];
    const group_id = value['group_id'];
    
    if (!title || typeof title !== 'string') {
        return c.text('Missing field \'title\'', 400);
    }
    
    if (!message || typeof message !== 'string') {
        return c.text('Missing field \'message\'', 400);
    }
    
    if (!group_id || typeof group_id !== 'string') {
        return c.text('Missing field \'group_id\'', 400);
    }

    return {
        requestBody: value
    }
});

export const jsonDiscussionPostValidator = validator('json', (value, c) => {
    const message = value['message'];
    const postID = value['postID'];

    if (!message || typeof message !== 'string') {
        return c.text('Missing field \'message\'', 400)
    }
    
    if (!postID || typeof postID !== 'string') {
        return c.text('Missing field \'postID\'', 400)
    }

    return {
        requestBody: value
    }
});