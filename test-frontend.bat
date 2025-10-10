@echo off
echo Testing PGConnect Frontend...
echo.

cd /d "d:\Kishore\New_project\PGConnect"

echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

echo.
echo Starting development server...
echo Open http://localhost:8080 in your browser
echo.

npm run dev