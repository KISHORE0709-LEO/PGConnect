-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pgs table
CREATE TABLE IF NOT EXISTS pgs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  gender VARCHAR(20) NOT NULL,
  distance VARCHAR(50),
  room_types VARCHAR(255),
  rent_amount INTEGER,
  amenities TEXT[],
  college VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert PG data from your CSV
INSERT INTO pgs (name, location, gender, distance, room_types, rent_amount, amenities, college) VALUES
('Serov House', 'Yelahanka', 'Female', '~5 km', 'Double, Triple', 9299, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'NMIT'),
('Albury House', 'Yelahanka', 'Male', '~5.5 km', 'Double, Triple', 8799, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'NMIT'),
('Watford House', 'Nagenahalli', 'Male', '~6.1 km', 'Double, Triple', 7699, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'NMIT'),
('Glencoe House', 'Nagenahalli', 'Male', '~6.2 km', 'Double, Triple, Quad', 7599, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'NMIT'),
('Salta House', 'Nagenahalli', 'Unisex', '~7.1 km', 'Double', 11499, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'NMIT'),
('Shanmuka PG', 'Yelahanka', 'Male', '~1 km', 'Single,Double', 12500, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'BMSIT'),
('Aadhya Luxurious PG', 'Yelahanka', 'Male', '~1 km', 'Single,Double', 8000, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'BMSIT'),
('SLN Luxury PG', 'Yelahanka', 'Male', '~1 km', 'Single,Double', 15000, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'BMSIT'),
('Janani Ladies PG', 'Avalahalli', 'Female', '~1 km', 'Single,Double,Triple', 16000, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'BMSIT'),
('Sri Devi Ladies PG', 'Avalahalli', 'Female', '~1 km', 'Single,Double,Triple', 15000, ARRAY['Food', 'Wi-Fi', 'Laundry'], 'BMSIT'),
('S V PG For Men', 'Rajarajeshwari Nagar', 'Male', '~2 km', 'Single,Double,Triple', 9299, ARRAY['Meals', 'Wi-Fi', 'Laundry'], 'RNSIT'),
('Sri Lucky Boys Hostel', 'Rajarajeshwari Nagar', 'Male', '~2 km', 'Single,Double,Triple', 9500, ARRAY['Meals', 'Wi-Fi', 'Laundry'], 'RNSIT'),
('SLN Grand PG', 'Bala Nagar, Hyderabad', 'Male', '~6.5 km', 'Single,Double,Triple', 12000, ARRAY['Meals', 'Wi-Fi', 'Laundry'], 'GITAM'),
('Navya Sri Women''s Hostels', 'Patancheru', 'Female', '~3 km', 'Single,Double,Triple', 5750, ARRAY['Meals', 'Wi-Fi', 'Laundry'], 'GITAM');

-- Insert sample users
INSERT INTO users (name, email, phone, password, role) VALUES
('John Student', 'student@test.com', '9876543210', 'password123', 'student'),
('Jane Owner', 'owner@test.com', '9876543211', 'password123', 'owner');