@echo off
echo Starting PGConnect Development Servers...
echo.

echo Starting Backend Server (Mock Mode) on port 3001...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server on port 8080...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo   PGConnect Development Environment
echo ========================================
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:3001
echo Mode:     Development (Mock Database)
echo ========================================
echo.
echo Press any key to close this window...
pause > nul