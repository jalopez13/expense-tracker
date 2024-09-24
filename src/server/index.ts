import app from './app';

Bun.serve({
  fetch: app.fetch,
});

console.log('Listening on http://localhost:3000...');
