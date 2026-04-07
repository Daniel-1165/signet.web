# Sanity CMS Integration - Complete Setup Guide

## ✅ Completed Setup

Your Sanity CMS integration is now installed and ready! Here's what has been configured:

### 1. **Project Structure**
```
sanity/
├── schemaTypes/          # Content models
│   ├── blockContent.ts   # Rich text editor
│   ├── post.ts          # Blog posts
│   ├── page.ts          # Static pages
│   ├── author.ts        # Authors
│   └── category.ts      # Categories
└── sanity.config.ts     # Main config

src/lib/sanity/
├── client.ts            # Sanity client
├── queries.ts           # GROQ queries
├── types.ts             # TypeScript types
└── image.ts             # Image optimization

src/app/api/
├── posts/               # API endpoints
├── pages/
└── blog/                # Frontend pages

src/components/sanity/
├── PostList.tsx         # List component
├── PostDetail.tsx       # Detail component
```

### 2. **Environment Setup**
Create `.env.local` with:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

### 3. **Packages Installed**
- `sanity@3.99.0` - Headless CMS
- `next-sanity@12.2.1` - Next.js integration
- `@sanity/cli@3.99.0` - CLI tools
- `@sanity/image-url@1.0.2` - Image handling
- `groq@3.0.0` - Query language

## 🚀 Getting Started

### Step 1: Create Sanity Account & Project
1. Go to [sanity.io](https://sanity.io)
2. Sign up or login
3. Create a new project named "signet-web"
4. Copy your Project ID

### Step 2: Generate API Token
1. In Sanity dashboard, go to **API → Tokens**
2. Click **Add API Token**
3. Name it "Next.js Token"
4. Give it "Editor" role
5. Copy the token

### Step 3: Update Environment Variables
In `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
```

### Step 4: Start Development
```bash
# Terminal 1: Start Sanity Studio
pnpm exec sanity start

# Terminal 2: Start Next.js dev server
pnpm dev
```

### Step 5: Access Services
- **Sanity Studio**: http://localhost:3333
- **Next.js App**: http://localhost:3000
- **Blog Page**: http://localhost:3000/blog

## 📝 Content Types Available

### Blog Post
- Title (required)
- Slug (auto-generated from title)
- Author (reference)
- Main Image (with hotspot)
- Categories (multiple)
- Published Date (required)
- Rich Text Body (required)

### Page
- Title (required)
- Slug (auto-generated)
- Rich Text Content
- SEO Title
- SEO Description
- Published Date (required)

### Author
- Name (required)
- Slug
- Profile Image
- Bio

### Category
- Title (required)
- Description

## 🔗 API Endpoints

**Get all posts:**
```
GET /api/posts
```

**Get single post:**
```
GET /api/posts/{slug}
```

**Get all pages:**
```
GET /api/pages
```

**Get single page:**
```
GET /api/pages/{slug}
```

## 💻 Using Content in Components

### Server Component Example
```typescript
import {client} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'

export default async function BlogPage() {
  const posts = await client.fetch(GET_ALL_POSTS)
  
  return (
    <>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.author?.name}</p>
        </div>
      ))}
    </>
  )
}
```

### Use Pre-built Components
```typescript
import PostList from '@/components/sanity/PostList'

export default async function Blog() {
  const posts = await client.fetch(GET_ALL_POSTS)
  return <PostList posts={posts} />
}
```

## 🖼️ Image Optimization

Images are automatically optimized:
```typescript
import {urlFor} from '@/lib/sanity/image'
import Image from 'next/image'

<Image
  src={urlFor(post.mainImage).width(400).url()}
  alt={post.title}
  width={400}
  height={300}
/>
```

## 🔄 Content Revalidation

- **Production**: Content cached for 1 hour (3600 seconds)
- **Development**: Content revalidated on each request
- **On-demand**: Trigger with API route `/api/revalidate`

## 🔐 Security

- API tokens stored in server-only `.env.local`
- Never expose `SANITY_API_TOKEN` to frontend
- Public queries only use `NEXT_PUBLIC_*` variables
- All server requests validated

## 📚 Learn More

- [Sanity Docs](https://www.sanity.io/docs)
- [Next.js Integration](https://www.sanity.io/docs/next-js)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
- [Content Modeling](https://www.sanity.io/docs/content-modeling)

## 🆘 Troubleshooting

### Sanity Studio Not Loading
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm exec sanity start
```

### Project ID or Token Issues
- Verify credentials in `.env.local`
- Check token hasn't expired
- Ensure token has "Editor" role
- Try generating a new token

### API Routes Returning 404
- Check dataset name matches in `.env.local`
- Verify `next-sanity` version: `pnpm list next-sanity`
- Clear `.next` folder: `rm -rf .next && pnpm build`

### Content Not Updating
- Check ISR revalidation time (default 1 hour)
- Manually trigger: `pnpm exec sanity graphql`
- Check browser cache

## 🎯 Next Steps

1. ✅ Environment variables configured
2. ✅ Sanity Studio set up
3. Create your first blog post
4. Test API endpoints
5. Deploy to production
6. Set up webhooks for real-time updates

---

**Status**: ✅ Ready to use
**Studio URL**: http://localhost:3333
**API**: GraphQL ready
**Next.js**: Server-side rendering with ISR
