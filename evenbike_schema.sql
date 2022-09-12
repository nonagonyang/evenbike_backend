

CREATE TABLE eco_levels (
    eco_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE active_levels (
    active_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE overall_levels (
    overall_level SERIAL PRIMARY KEY,
    level_limit INTEGER NOT NULL
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  weight FLOAT NOT NULL,
  height FLOAT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  eco_points INTEGER NOT NULL DEFAULT 0,
  active_points INTEGER NOT NULL DEFAULT 0,
  total_points INTEGER NOT NULL DEFAULT 0,
  eco_level INTEGER NOT NULL DEFAULT 0,
  active_level INTEGER NOT NULL DEFAULT 0,
  overall_level INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE trips (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  start_dock TEXT NOT NULL,
  end_dock TEXT,
  distance FLOAT NOT NULL DEFAULT 0,
  duration INTEGER NOT NULL DEFAULT 0,
  start_time TEXT NOT NULL DEFAULT '1:12:24 PM',
  end_time TEXT NOT NULL DEFAULT '1:12:24 PM',
  eco_points INTEGER NOT NULL DEFAULT 0,
  active_points INTEGER NOT NULL DEFAULT 0
);




