/**
 * Sanity Studio Setup Instructions
 * 
 * This guide explains how to set up Sanity Studio for your Next.js project.
 * Follow the steps below in order.
 */

// ============================================================================
// STEP 1: CREATE SANITY ACCOUNT & PROJECT
// ============================================================================
// Visit: https://www.sanity.io
// 1. Click "Sign Up" or "Sign In"
// 2. Use Google, GitHub, or email
// 3. Create a new project
// 4. Name it: "signet-web"
// 5. Copy the Project ID shown on the success screen

// ============================================================================
// STEP 2: GET YOUR PROJECT ID & DATASET
// ============================================================================
// Go to: https://sanity.io/manage
// 1. Select your project
// 2. Copy the Project ID (looks like: "abc123def456ghi789")
// 3. Default Dataset: "production"
// 4. Add to .env.local

// ============================================================================
// STEP 3: CREATE API TOKEN
// ============================================================================
// Go to: https://sanity.io/manage
// 1. Select your project
// 2. Go to "API" tab → "Tokens"
// 3. Click "Add API Token"
// 4. Name it: "Next.js Token" or "Development"
// 5. Set Role to "EDITOR" (can create/edit/delete content)
// 6. Copy the generated token
// 7. Add to .env.local as SANITY_API_TOKEN

// ============================================================================
// STEP 4: UPDATE .env.local
// ============================================================================
// Create file: .env.local
// Add these values:
/*
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
*/

// ============================================================================
// STEP 5: START SANITY STUDIO
// ============================================================================
// Run in terminal:
// pnpm exec sanity start

// Studio will open at: http://localhost:3333
// You'll need to:
// - Grant permission to access your Sanity project
// - Click "Authorize" when prompted

// ============================================================================
// STEP 6: START NEXT.JS
// ============================================================================
// In a second terminal, run:
// pnpm dev

// App will be at: http://localhost:3000
// Blog page: http://localhost:3000/blog

// ============================================================================
// TROUBLESHOOTING
// ============================================================================

// ERROR: "Missing NEXT_PUBLIC_SANITY_PROJECT_ID"
// FIX: Add the environment variable to .env.local and restart Sanity

// ERROR: "Unauthorized" in Sanity Studio
// FIX: Make sure SANITY_API_TOKEN is correct and has EDITOR role

// ERROR: Port 3333 is already in use
// FIX: Kill the process or use different port:
// pnpm exec sanity start -- --port 3334

// ERROR: "Cannot find module 'sanity'"
// FIX: Run: pnpm install

export {}
