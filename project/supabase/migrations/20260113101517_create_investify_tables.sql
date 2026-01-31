/*
  Investify Trading Platform Schema

  1. New Tables
    - course_enrollments: Stores user enrollments and payment information
      - id (uuid, primary key)
      - email (text, unique, not null) - User email address
      - payment_status (text, not null) - pending, completed, failed
      - payment_method (text) - Payment method used
      - amount (numeric) - Payment amount
      - created_at (timestamptz) - Enrollment timestamp
      - updated_at (timestamptz) - Last update timestamp
    
    - success_stories: Stores trader success stories
      - id (uuid, primary key)
      - name (text, not null) - Trader name
      - story (text, not null) - Success story description
      - profit_percentage (numeric) - Profit percentage achieved
      - trading_style (text) - Type of trading
      - image_url (text) - Profile image URL
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to success stories
    - Add policies for creating enrollments
*/

CREATE TABLE IF NOT EXISTS course_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  payment_method text,
  amount numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  story text NOT NULL,
  profit_percentage numeric,
  trading_style text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create enrollments"
  ON course_enrollments
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read success stories"
  ON success_stories
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage success stories"
  ON success_stories
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
