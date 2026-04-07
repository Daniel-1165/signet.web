#!/bin/bash
# Sanity CMS + Next.js Development Server

echo "🚀 Starting Signet Web with Sanity CMS..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "💡 Please copy .env.sanity.example to .env.local and add your Sanity credentials"
    echo ""
    echo "Steps:"
    echo "1. Copy: cp .env.sanity.example .env.local"
    echo "2. Edit .env.local with your Project ID and API Token"
    echo "3. Get credentials from: https://sanity.io/manage/"
    exit 1
fi

echo "✅ Environment variables found"
echo ""

# Install dependencies if node_modules doesn't exist
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    pnpm install
    echo ""
fi

echo "🎬 Starting both servers..."
echo "   - Sanity Studio: http://localhost:3333"
echo "   - Next.js App: http://localhost:3000"
echo ""

# Start both servers in parallel
(cd . && pnpm exec sanity start) &
SANITY_PID=$!

sleep 3

(cd . && pnpm dev) &
NEXTJS_PID=$!

# Wait for both processes
wait $SANITY_PID $NEXTJS_PID
