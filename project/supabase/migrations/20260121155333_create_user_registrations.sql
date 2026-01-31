/*
  # User Registrations Table

  1. New Tables
    - `user_registrations`
      - `id` (uuid, primary key)
      - `full_name` (text, required)
      - `email` (text, required, unique)
      - `password` (text, required)
      - `ip_address` (text)
      - `user_agent` (text)
      - `location_name` (text) - City, Country
      - `latitude` (numeric) - GPS latitude
      - `longitude` (numeric) - GPS longitude
      - `created_at` (timestamptz, default now())
  
  2. Security
    - Enable RLS on `user_registrations` table
    - Add policy for admins to read all registrations
    - No public insert/update/delete allowed (handled via edge function)
  
  3. Important Notes
    - Stores new user registration details
    - Location data captured from browser geolocation API
    - All registrations logged to Discord webhook
*/

CREATE TABLE IF NOT EXISTS user_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  ip_address text,
  user_agent text,
  location_name text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all registrations"
  ON user_registrations
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );
