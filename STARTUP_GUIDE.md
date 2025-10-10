# PGConnect Startup Guide

## Quick Start

### Option 1: Use the Batch Script (Recommended)
1. Double-click `start-dev.bat` in the project root
2. This will start both servers automatically
3. Frontend will be available at: http://localhost:8080
4. Backend API will be available at: http://localhost:3001

### Option 2: Manual Start
1. **Start Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will start on port 3001

2. **Start Frontend Server (in a new terminal):**
   ```bash
   npm run dev
   ```
   Frontend will start on port 8080

## Access the Application
- **Website:** http://localhost:8080
- **API Health Check:** http://localhost:3001/health

## Configuration
- Frontend runs on port 8080
- Backend runs on port 3001
- API requests from frontend are automatically proxied to backend
- Database connection is configured in `backend/.env`

## Troubleshooting
1. **Port already in use:** Make sure no other applications are using ports 8080 or 3001
2. **Database connection issues:** Check the database credentials in `backend/.env`
3. **API errors:** Ensure both servers are running and check browser console for errors

## Features Available
- User Registration (Student/Owner)
- User Login
- Student Dashboard
- Owner Dashboard
- PG Listings
- Building Visualization