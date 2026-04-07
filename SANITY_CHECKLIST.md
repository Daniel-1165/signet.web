# Sanity Integration Checklist

## ✅ Completed

- [x] **Project Structure** - Full folder hierarchy created
- [x] **Dependencies Installed** - All Sanity packages added to package.json
- [x] **Configuration Files** - sanity.config.ts configured
- [x] **Content Schemas** - 5 content types created (posts, pages, authors, categories, blockContent)
- [x] **Sanity Client** - Configured with caching and ISR
- [x] **GROQ Queries** - Standard queries defined for fetching content
- [x] **API Routes** - 4 API endpoints created for content fetching
- [x] **React Components** - PostList and PostDetail components ready
- [x] **Blog Pages** - /blog and /blog/[slug] pages set up
- [x] **TypeScript Types** - Full type definitions for all content
- [x] **Image Optimization** - Image URL builder configured
- [x] **Environment Template** - .env.sanity.example created

## 📋 Frontend Checklist

- [x] Start Sanity Studio: `npx sanity start` or use `dev.bat`
- [x] Start Next.js dev: `pnpm dev` 
- [ ] Browser Sanity Studio: http://localhost:3333
- [ ] Browser Next.js: http://localhost:3000

## 🔧 Configuration Checklist

- [ ] Create `.env.local` file
- [ ] Add `NEXT_PUBLIC_SANITY_PROJECT_ID` (get from sanity.io/manage)
- [ ] Add `NEXT_PUBLIC_SANITY_DATASET` (usually "production")
- [ ] Add `SANITY_API_TOKEN` (generate at sanity.io/manage → API → Tokens)

## 📝 Content Creation Checklist

- [ ] CRUD blog posts (Title, Slug, Author, Image, Categories, Body)
- [ ] CRUD static pages (Title, Slug, Content, SEO fields)
- [ ] CRUD authors (Name, Image, Bio)
- [ ] CRUD categories (Title, Description)
- [ ] Upload featured images (all images have hotspot enabled)

## 🚀 Development Workflow

1. **Start services** (Windows): Double-click `dev.bat`
   - Terminal 1: Sanity Studio on port 3333
   - Terminal 2: Next.js on port 3000

2. **Create content** at http://localhost:3333
   - Create blog posts
   - Create authors & categories
   - Upload images

3. **View content** at http://localhost:3000
   - Blog page: /blog
   - Post detail: /blog/post-slug
   - API: /api/posts

4. **Deploy**:
   ```bash
   pnpm build
   pnpm start
   ```

## 🌐 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/posts` | GET | Get all blog posts |
| `/api/posts/:slug` | GET | Get single blog post |
| `/api/pages` | GET | Get all pages |
| `/api/pages/:slug` | GET | Get single page |

## 🔗 External Links

| Resource | Link |
|----------|------|
| Sanity Account | https://sanity.io/manage |
| API Tokens | https://sanity.io/manage → API |
| Documentation | https://www.sanity.io/docs |
| Next.js Guide | https://www.sanity.io/docs/next-js |
| GROQ Reference | https://www.sanity.io/docs/groq |

## 📊 Content Model

```
Post
├── title (string)
├── slug (slug, auto-generated)
├── author (reference → Author)
├── mainImage (image)
├── categories (array → Category[])
├── publishedAt (datetime)
└── body (blockContent)

Page
├── title (string)
├── slug (slug)
├── content (blockContent)
├── seoTitle (string)
├── seoDescription (text)
└── publishedAt (datetime)

Author
├── name (string)
├── slug (slug)
├── image (image)
└── bio (text)

Category
├── title (string)
└── description (text)
```

## 🆘 Quick Fixes

**Sanity Studio not loading?**
```bash
npm cache clean --force
rm -rf node_modules .next pnpm-lock.yaml
pnpm install
npx sanity start
```

**Port 3333 already in use?**
```bash
npx sanity start --port 3334
```

**Need to regenerate API token?**
- Go to sanity.io/manage
- Click API → Tokens
- Create new token with "Editor" role
- Update SANITY_API_TOKEN in .env.local

---

**Last Updated**: April 7, 2026
**Status**: ✅ Ready for Development
