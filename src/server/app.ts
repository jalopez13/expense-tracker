import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { serveStatic } from 'hono/bun';
import { expensesRouter } from './routes/expenses';

const app = new Hono();

// Middlewares
app.use('*', logger());
app.use('*', cors());

// Routes
app.route('/api/expenses', expensesRouter);

// Fallback
app.get('*', serveStatic({ root: './frontend/dist' }));
app.get('*', serveStatic({ path: './frontend/dist/index.html' }));

export default app;
