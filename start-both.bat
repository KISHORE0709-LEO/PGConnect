@echo off
echo Starting PGConnect with Mock Backend...

start "Backend" cmd /k "cd backend && node src/server-dev.js"
timeout /t 2 /nobreak > nul
start "Frontend" cmd /k "npm run dev"

echo Both servers starting...
echo Frontend: http://localhost:8080
echo Backend: http://localhost:3001 (Mock Mode)
pause