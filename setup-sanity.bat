@echo off
REM setup-sanity.bat - Automated Sanity setup guide for Windows

echo.
echo ==========================================
echo.
echo 🚀 Sanity CMS Setup Guide
echo.
echo ==========================================
echo.

if not exist .env.local (
    echo 📝 Step 1: Creating .env.local template...
    copy .env.sanity.example .env.local
    echo ✅ Created .env.local
    echo.
    echo.
    echo ⚠️  YOU NEED TO UPDATE .env.local WITH YOUR CREDENTIALS
    echo.
    echo Before continuing, please:
    echo.
    echo 1. Open .env.local file
    echo 2. Go to https://sanity.io/manage
    echo 3. Create a new project (name it "signet-web")
    echo 4. Copy your Project ID
    echo 5. Go to API ^> Tokens section
    echo 6. Create API token with EDITOR role
    echo 7. Update .env.local with your credentials:
    echo    - NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
    echo    - NEXT_PUBLIC_SANITY_DATASET=production
    echo    - SANITY_API_TOKEN=your_api_token
    echo.
    pause
)

echo 📦 Installing dependencies...
if not exist node_modules (
    call pnpm install
)

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Start Sanity Studio: pnpm exec sanity start
echo 2. Start Next.js: pnpm dev (in another terminal)
echo 3. Open http://localhost:3333 for Sanity Studio
echo 4. Open http://localhost:3000 for your app
echo.
pause
