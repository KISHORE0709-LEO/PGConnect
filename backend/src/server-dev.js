import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080', 'http://localhost:8083'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mock data for development
const mockUsers = [];
let userIdCounter = 1;

// Mock Auth Routes
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
      id: userIdCounter++,
      name,
      email,
      phone,
      role: role || 'student',
      created_at: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    // Generate mock token
    const token = `mock-token-${newUser.id}`;
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = mockUsers.find(user => user.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Generate mock token
    const token = `mock-token-${user.id}`;
    
    res.json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Mock PG Routes
app.get('/api/pgs', (req, res) => {
  res.json({
    message: 'PG listings retrieved successfully',
    pgs: [
      {
        id: 1,
        name: 'Sample PG',
        address: '123 Main St',
        city: 'Bangalore',
        rent_amount: 8000,
        available_rooms: 5,
        amenities: ['WiFi', 'Food', 'Laundry']
      }
    ]
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    mode: 'development',
    database: 'mock'
  });
});

// Serve static files from React build
const frontendPath = path.join(__dirname, '../../dist');
app.use(express.static(frontendPath));

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendPath, 'index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:8080`);
  console.log(`🔧 Backend API: http://localhost:${PORT}`);
  console.log(`💾 Database: Mock mode (no database required)`);
});