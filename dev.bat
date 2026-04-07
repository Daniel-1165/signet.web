@echo off
REM Sanity CMS + Next.js Development Server for Windows

echo.
echo 🚀 Starting Signet Web with Sanity CMS...
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo ❌ .env.local not found!
    echo.
    echo 💡 Please create .env.local with your Sanity credentials:
    echo.
    echo Steps:
    echo 1. Copy .env.sanity.example to .env.local
    echo 2. Edit .env.local with your credentials from https://sanity.io/manage/
    echo.
    pause
    exit /b 1
)

echo ✅ Environment variables found
echo.

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo 📦 Installing dependencies...
    pnpm install
    echo.
)

echo 🎬 Starting servers:
echo    - Sanity Studio: http://localhost:3333
echo    - Next.js App: http://localhost:3000
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start Sanity Studio
echo Starting Sanity Studio...
start "Sanity Studio" cmd /k pnpm exec sanity start

REM Wait a moment for Sanity to start
timeout /t 3 /nobreak

REM Start Next.js
echo Starting Next.js dev server...
pnpm dev
