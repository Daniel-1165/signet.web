#!/bin/bash
# setup-sanity.sh - Automated Sanity setup guide

echo "=========================================="
echo "🚀 Sanity CMS Setup Guide"
echo "=========================================="
echo ""

# Check environment
if [ ! -f .env.local ]; then
    echo "📝 Step 1: Creating .env.local template..."
    cp .env.sanity.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  YOU NEED TO UPDATE .env.local WITH YOUR CREDENTIALS:"
    echo ""
    echo "1. Go to: https://sanity.io/manage"
    echo "2. Create a new project or select existing one"
    echo "3. Copy your Project ID"
    echo "4. Go to API → Tokens"
    echo "5. Create a new API token with EDITOR role"
    echo "6. Update .env.local with:"
    echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID=your_id"
    echo "   - SANITY_API_TOKEN=your_token"
    echo ""
    read -p "Press Enter after updating .env.local..."
fi

echo "📦 Installing dependencies..."
if [ ! -d node_modules ]; then
    pnpm install
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start Sanity Studio: pnpm exec sanity start"
echo "2. Start Next.js: pnpm dev (in another terminal)"
echo "3. Open http://localhost:3333 for Sanity Studio"
echo "4. Open http://localhost:3000 for your app"
echo ""
