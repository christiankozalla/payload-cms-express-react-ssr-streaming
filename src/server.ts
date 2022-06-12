import express from 'express';
import payload from 'payload';
import { reactRender } from './lib/react-render';

require('dotenv').config();
const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
  }
});

app.use((_, res, next) => {
  res.render = reactRender;
  next();
});

// Add your own express routes here
app.get('/posts/:id', async (req, res) => {
  if (!req.params.id) return res.send('<h1>Error, please provide an ID</h1>');

  try {
    const post = await payload.findByID({
      collection: 'posts', // required
      id: req.params.id, // required
      depth: 2,
      locale: 'en',
      overrideAccess: false,
      showHiddenFields: true
    });
    res.render('Post', { doc: post });
  } catch (err) {
    if (err instanceof Error) {
      return res.send(`<h1>Error: ${err.name}<br>${err.message}</h1>`);
    }
  }
});

app.listen(3000);
