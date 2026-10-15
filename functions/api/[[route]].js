import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { handle } from 'hono/cloudflare-pages';
import { sign, verify } from 'hono/jwt';
import bcrypt from 'bcryptjs';
import panchangData from '../../backend/utils/jain_panchang_2025.json';

const app = new Hono().basePath('/api');

// CORS
app.use('*', cors({
  origin: ['http://localhost:8080', 'https://jsot.cloudgenz.com', 'https://jsotcanada.org', 'https://www.jsotcanada.org'],
  credentials: true,
}));

const getSecret = (c) => c.env.JWT_SECRET || 'jsot-jwt-secret-2026-cloudgenz';
const JWT_ALG = 'HS256';

// Auth middleware
const authMiddleware = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) return c.json({ message: 'No token provided' }, 403);
  const token = authHeader.split(' ')[1];
  if (!token) return c.json({ message: 'No token provided' }, 403);
  try {
    const payload = await verify(token, getSecret(c), JWT_ALG);
    c.set('userId', payload.id);
    await next();
  } catch (e) {
    console.error('JWT verify error:', e.message);
    return c.json({ message: 'Unauthorized' }, 401);
  }
};

// Helper: check if event is past
const checkIfEventIsPast = (dateString, timeString) => {
  if (!dateString) return false;
  try {
    const now = new Date();
    if (!timeString) return new Date(dateString) < new Date(now.toDateString());
    const eventDate = new Date(`${dateString}T${timeString}:00`);
    return !isNaN(eventDate.getTime()) && eventDate < now;
  } catch { return false; }
};

// Helper: parse multipart or JSON body
const parseBody = async (c) => {
  const contentType = c.req.header('Content-Type') || '';
  if (contentType.includes('multipart/form-data')) {
    const formData = await c.req.formData();
    const body = {};
    const files = [];
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) files.push({ key, file: value });
      else body[key] = value;
    }
    return { body, files };
  }
  return { body: await c.req.json(), files: [] };
};

// Helper: upload file to R2
const uploadToR2 = async (r2, file) => {
  const ext = file.name.substring(file.name.lastIndexOf('.'));
  const key = `uploads/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
  await r2.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
  return key;
};

// ==================== AUTH ====================
app.post('/login', async (c) => {
  const { userName, userPassword } = await c.req.json();
  const admin = await c.env.DB.prepare('SELECT * FROM admin WHERE userName = ?').bind(userName).first();
  if (!admin) return c.json({ message: 'User not found' }, 404);
  const isMatch = await bcrypt.compare(userPassword, admin.userPassword);
  if (!isMatch) return c.json({ message: 'Invalid credentials' }, 400);
  const token = await sign({ id: admin.userID, exp: Math.floor(Date.now() / 1000) + 86400 }, getSecret(c), JWT_ALG);
  return c.json({ message: 'Login successful', token, user: admin.userName });
});

app.post('/logout', (c) => c.json({ message: 'Logout successful' }));

// ==================== EVENTS ====================
app.get('/events', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM events ORDER BY fullDate ASC').all();
  return c.json(results.map(e => ({ ...e, galleryImages: e.galleryImages ? JSON.parse(e.galleryImages) : [] })));
});

app.post('/add-event', authMiddleware, async (c) => {
  const { body, files } = await parseBody(c);
  const { title, dateDisplay, fullDate, day, month, year, time, endTime, type, description, location } = body;
  const isPast = checkIfEventIsPast(fullDate, endTime || time);

  let galleryImages = [];
  if (isPast && files.length > 0) {
    for (const { file } of files) {
      galleryImages.push(await uploadToR2(c.env.R2, file));
    }
  }

  const result = await c.env.DB.prepare(
    'INSERT INTO events (title,dateDisplay,fullDate,day,month,year,time,endTime,type,description,location,galleryImages) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'
  ).bind(title, dateDisplay, fullDate, day || null, month || null, year || null, time || null, endTime || null, type || null, description || null, location || null, JSON.stringify(galleryImages)).run();

  const event = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(result.meta.last_row_id).first();
  return c.json({ message: 'Event added', event }, 201);
});

app.put('/update-event/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const existing = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ message: 'Event not found' }, 404);

  const { body, files } = await parseBody(c);
  const fullDate = body.fullDate || existing.fullDate;
  const time = body.time !== undefined ? body.time : existing.time;
  const endTime = body.endTime !== undefined ? body.endTime : existing.endTime;
  const isPast = checkIfEventIsPast(fullDate, endTime || time);

  let galleryImages;
  if (files.length > 0 && isPast) {
    let current = [];
    try { current = JSON.parse(existing.galleryImages || '[]'); } catch { current = []; }
    const newImages = [];
    for (const { file } of files) newImages.push(await uploadToR2(c.env.R2, file));
    galleryImages = JSON.stringify([...current, ...newImages]);
  } else {
    galleryImages = body.galleryImages !== undefined
      ? (typeof body.galleryImages === 'string' ? body.galleryImages : JSON.stringify(body.galleryImages))
      : existing.galleryImages;
  }

  await c.env.DB.prepare(
    "UPDATE events SET title=?,dateDisplay=?,fullDate=?,day=?,month=?,year=?,time=?,endTime=?,type=?,description=?,location=?,galleryImages=?,updatedAt=datetime('now') WHERE id=?"
  ).bind(
    body.title || existing.title, body.dateDisplay || existing.dateDisplay, fullDate,
    body.day !== undefined ? body.day : existing.day, body.month !== undefined ? body.month : existing.month,
    body.year !== undefined ? body.year : existing.year, time, endTime,
    body.type !== undefined ? body.type : existing.type,
    body.description !== undefined ? body.description : existing.description,
    body.location !== undefined ? body.location : existing.location,
    galleryImages, id
  ).run();

  const updated = await c.env.DB.prepare('SELECT * FROM events WHERE id = ?').bind(id).first();
  return c.json({ message: 'Event updated successfully', event: updated });
});

app.delete('/delete-event/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const result = await c.env.DB.prepare('DELETE FROM events WHERE id = ?').bind(id).run();
  return result.meta.changes > 0
    ? c.json({ message: 'Event deleted successfully' })
    : c.json({ message: 'Event not found' }, 404);
});

// ==================== DARSHAN ====================
app.get('/darshan', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM darshan_timings').all();
  return c.json(results);
});

app.post('/add-darshan', authMiddleware, async (c) => {
  const { dayRange, startTime, endTime } = await c.req.json();
  const result = await c.env.DB.prepare('INSERT INTO darshan_timings (dayRange,startTime,endTime) VALUES (?,?,?)').bind(dayRange, startTime, endTime).run();
  const timing = await c.env.DB.prepare('SELECT * FROM darshan_timings WHERE id = ?').bind(result.meta.last_row_id).first();
  return c.json({ message: 'Timing added', timing }, 201);
});

app.put('/update-darshan/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const existing = await c.env.DB.prepare('SELECT * FROM darshan_timings WHERE id = ?').bind(id).first();
  if (!existing) return c.json({ message: 'Timing not found' }, 404);
  await c.env.DB.prepare("UPDATE darshan_timings SET dayRange=?,startTime=?,endTime=?,updatedAt=datetime('now') WHERE id=?")
    .bind(body.dayRange || existing.dayRange, body.startTime || existing.startTime, body.endTime || existing.endTime, id).run();
  const updated = await c.env.DB.prepare('SELECT * FROM darshan_timings WHERE id = ?').bind(id).first();
  return c.json({ message: 'Timing updated successfully', timing: updated });
});

app.delete('/delete-darshan/:id', authMiddleware, async (c) => {
  const result = await c.env.DB.prepare('DELETE FROM darshan_timings WHERE id = ?').bind(c.req.param('id')).run();
  return result.meta.changes > 0
    ? c.json({ message: 'Timing deleted successfully' })
    : c.json({ message: 'Timing not found' }, 404);
});

// ==================== EVENT TYPES ====================
app.get('/event-types', async (c) => {
  let { results } = await c.env.DB.prepare('SELECT * FROM event_types').all();
  if (results.length === 0) {
    for (const name of ['Festival', 'Puja', 'Education', 'Celebration', 'Community']) {
      await c.env.DB.prepare('INSERT OR IGNORE INTO event_types (name) VALUES (?)').bind(name).run();
    }
    results = (await c.env.DB.prepare('SELECT * FROM event_types').all()).results;
  }
  return c.json(results);
});

app.post('/add-event-type', authMiddleware, async (c) => {
  const { name } = await c.req.json();
  if (!name) return c.json({ message: 'Name is required' }, 400);
  const existing = await c.env.DB.prepare('SELECT * FROM event_types WHERE name = ?').bind(name).first();
  if (existing) return c.json({ message: 'Type already exists' }, 400);
  const result = await c.env.DB.prepare('INSERT INTO event_types (name) VALUES (?)').bind(name).run();
  const newType = await c.env.DB.prepare('SELECT * FROM event_types WHERE id = ?').bind(result.meta.last_row_id).first();
  return c.json(newType, 201);
});

// ==================== ARTICLES ====================
app.get('/articles', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM articles ORDER BY createdAt DESC').all();
  return c.json(results);
});

app.post('/add-article', authMiddleware, async (c) => {
  const { body, files } = await parseBody(c);
  let imagePath = null;
  const imageFile = files.find(f => f.key === 'image');
  if (imageFile) imagePath = await uploadToR2(c.env.R2, imageFile.file);

  const result = await c.env.DB.prepare(
    'INSERT INTO articles (title,author,date,excerpt,externalLink,image) VALUES (?,?,?,?,?,?)'
  ).bind(body.title, body.author, body.date, body.excerpt || null, body.externalLink || null, imagePath).run();

  const article = await c.env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(result.meta.last_row_id).first();
  return c.json({ message: 'Article added successfully', article }, 201);
});

app.put('/toggle-featured-article/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const article = await c.env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first();
  if (!article) return c.json({ error: 'Article not found' }, 404);
  if (!article.isFeatured) {
    const { results } = await c.env.DB.prepare('SELECT COUNT(*) as cnt FROM articles WHERE isFeatured = 1').all();
    if (results[0].cnt >= 3) return c.json({ error: 'Maximum 3 articles can be featured.' }, 400);
  }
  await c.env.DB.prepare('UPDATE articles SET isFeatured = ? WHERE id = ?').bind(article.isFeatured ? 0 : 1, id).run();
  const updated = await c.env.DB.prepare('SELECT * FROM articles WHERE id = ?').bind(id).first();
  return c.json({ message: 'Status updated', article: updated });
});

app.delete('/delete-article/:id', authMiddleware, async (c) => {
  await c.env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ message: 'Article deleted' });
});

// ==================== VIDEOS ====================
app.get('/videos', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT * FROM videos ORDER BY createdAt DESC').all();
  return c.json(results);
});

app.post('/add-video', authMiddleware, async (c) => {
  const { body, files } = await parseBody(c);
  let thumbnailPath = null;
  const thumbFile = files.find(f => f.key === 'thumbnail');
  if (thumbFile) thumbnailPath = await uploadToR2(c.env.R2, thumbFile.file);

  const result = await c.env.DB.prepare(
    'INSERT INTO videos (title,speaker,videoLink,thumbnail) VALUES (?,?,?,?)'
  ).bind(body.title, body.speaker || null, body.videoLink || null, thumbnailPath).run();

  const video = await c.env.DB.prepare('SELECT * FROM videos WHERE id = ?').bind(result.meta.last_row_id).first();
  return c.json({ message: 'Video resource added', video }, 201);
});

app.put('/toggle-featured-video/:id', authMiddleware, async (c) => {
  const id = c.req.param('id');
  const video = await c.env.DB.prepare('SELECT * FROM videos WHERE id = ?').bind(id).first();
  if (!video) return c.json({ error: 'Video not found' }, 404);
  if (!video.isFeatured) {
    const { results } = await c.env.DB.prepare('SELECT COUNT(*) as cnt FROM videos WHERE isFeatured = 1').all();
    if (results[0].cnt >= 3) return c.json({ error: 'Maximum 3 videos can be featured.' }, 400);
  }
  await c.env.DB.prepare('UPDATE videos SET isFeatured = ? WHERE id = ?').bind(video.isFeatured ? 0 : 1, id).run();
  const updated = await c.env.DB.prepare('SELECT * FROM videos WHERE id = ?').bind(id).first();
  return c.json({ message: 'Status updated', video: updated });
});

app.delete('/delete-video/:id', authMiddleware, async (c) => {
  await c.env.DB.prepare('DELETE FROM videos WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ message: 'Video deleted' });
});

// ==================== PANCHANG ====================
app.get('/panchang-2025', (c) => c.json(panchangData));

// ==================== R2 FILE SERVING (via /api/uploads/*) ====================
app.get('/uploads/*', async (c) => {
  const key = c.req.path.replace('/api/', '');
  const object = await c.env.R2.get(key);
  if (!object) return c.json({ error: 'File not found' }, 404);
  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=31536000');
  return new Response(object.body, { headers });
});

export const onRequest = handle(app);
