import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { config } from 'dotenv';
import { verifyAuthenticatedUser } from './middlewares/Auth';
import { AuthRouter } from './controllers/auth';

config();

const app = new Hono();

app.notFound((c) => {
  return c.text('Resource not found', 404);
});

app.get('/', verifyAuthenticatedUser, (c) => {
  return c.text('Hello Hono!')
});

app.route('/auth', AuthRouter);

const port = Number(process.env.ENGINE_PORT) || 3000;

serve({
  fetch: app.fetch,
  port
});

console.log(`Server is running on port ${port}`);