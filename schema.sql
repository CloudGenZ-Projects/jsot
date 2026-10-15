CREATE TABLE IF NOT EXISTS admin (
  userID INTEGER PRIMARY KEY AUTOINCREMENT,
  userName TEXT NOT NULL UNIQUE,
  userPassword TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  dateDisplay TEXT NOT NULL,
  fullDate TEXT NOT NULL,
  day TEXT,
  month TEXT,
  year TEXT,
  time TEXT,
  endTime TEXT,
  type TEXT,
  description TEXT,
  location TEXT,
  galleryImages TEXT DEFAULT '[]',
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS darshan_timings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dayRange TEXT NOT NULL,
  startTime TEXT NOT NULL,
  endTime TEXT NOT NULL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS event_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  date TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  externalLink TEXT,
  isFeatured INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  speaker TEXT,
  thumbnail TEXT,
  videoLink TEXT,
  isFeatured INTEGER DEFAULT 0,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);
