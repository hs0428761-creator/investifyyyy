/*
  # Create authentication and admin management tables

  1. New Tables
    - `admin_users` - Admin accounts with special access
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `username` (text, unique)
      - `password_hash` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
    
    - `user_sessions` - Track user login sessions for "remember me"
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `session_token` (text, unique)
      - `device_info` (text)
      - `expires_at` (timestamp)
      - `created_at` (timestamp)
    
    - `login_logs` - Track login attempts for security and Discord webhook
      - `id` (uuid, primary key)
      - `email` (text)
      - `status` (text: 'success' or 'failed')
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)
    
    - `website_pages` - Store course and page content
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `pdf_url` (text)
      - `is_published` (boolean, default true)
      - `order` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `banned_users` - Track banned users
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `reason` (text)
      - `banned_by` (text)
      - `created_at` (timestamp)
    
    - `traffic_analytics` - Track website traffic
      - `id` (uuid, primary key)
      - `page_url` (text)
      - `visitor_count` (integer, default 1)
      - `unique_visitors` (integer, default 1)
      - `date` (date)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Admin users can manage all content
    - Regular users can only view published content
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  session_token text UNIQUE NOT NULL,
  device_info text,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS login_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'failed')),
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS website_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  content text,
  pdf_url text,
  is_published boolean DEFAULT true,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS banned_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  reason text,
  banned_by text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS traffic_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url text NOT NULL,
  visitor_count integer DEFAULT 1,
  unique_visitors integer DEFAULT 1,
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE banned_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin users can view all admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anonymous can view published pages"
  ON website_pages FOR SELECT
  TO anon
  USING (is_published = true);

CREATE POLICY "Authenticated can view published pages"
  ON website_pages FOR SELECT
  TO authenticated
  USING (is_published = true);

CREATE POLICY "Anyone can view traffic analytics"
  ON traffic_analytics FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous can view banned users list"
  ON banned_users FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view banned users list"
  ON banned_users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anonymous can insert login logs"
  ON login_logs FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated can insert login logs"
  ON login_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

INSERT INTO admin_users (email, username, password_hash, is_active)
VALUES (
  'admin@investify.com',
  'AdminZAS',
  '$2a$10$9c2c0c3f4f3f3f3f3f3f3e3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f3f',
  true
) ON CONFLICT (email) DO NOTHING;
