# Sanity Integration Setup

## Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Installation Steps

1. **Get your Sanity credentials**:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Create or select your project
   - Navigate to API → Tokens
   - Create a new token with "Editor" role
   - Copy your Project ID and API token

2. **Update package.json**:
   Add the following dependencies:
   ```json
   {
     "dependencies": {
       "next-sanity": "^5.0.0",
       "sanity": "^3.0.0",
       "@sanity/image-url": "^1.0.0",
       "groq": "^3.0.0"
     },
     "devDependencies": {
       "@sanity/cli": "^3.0.0"
     }
   }
   ```

3. **Install dependencies**:
   ```bash
   pnpm install
   ```

4. **Start Sanity Studio**:
   ```bash
   npx sanity@latest init --coupon nextjs2024
   ```
   Or manually:
   ```bash
   pnpm add -g @sanity/cli
   sanity start
   ```

## Project Structure

```
sanity/
├── schemaTypes/
│   ├── index.ts           # Schema exports
│   ├── blockContent.ts    # Portable text content
│   ├── post.ts           # Blog post schema
│   ├── page.ts           # Static page schema
│   ├── author.ts         # Author schema
│   └── category.ts       # Category schema
└── sanity.config.ts      # Sanity configuration

src/
├── lib/sanity/
│   ├── client.ts         # Sanity client setup
│   └── queries.ts        # GROQ query definitions
├── app/api/
│   ├── posts/
│   │   ├── route.ts      # GET /api/posts
│   │   └── [slug]/route.ts # GET /api/posts/:slug
│   └── pages/
│       ├── route.ts      # GET /api/pages
│       └── [slug]/route.ts # GET /api/pages/:slug
└── components/
    └── sanity/
        ├── PostList.tsx      # Display all posts
        └── PostDetail.tsx    # Display single post
```

## Usage Examples

### Fetch All Posts

```typescript
import {client} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'

const posts = await client.fetch(GET_ALL_POSTS)
```

### Fetch Single Post

```typescript
import {client} from '@/lib/sanity/client'
import {GET_POST_BY_SLUG} from '@/lib/sanity/queries'

const post = await client.fetch(GET_POST_BY_SLUG, {slug: 'my-post'})
```

### In Next.js Components

```typescript
// Server Component
import {client} from '@/lib/sanity/client'
import {GET_ALL_POSTS} from '@/lib/sanity/queries'

export default async function BlogPage() {
  const posts = await client.fetch(GET_ALL_POSTS)
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.author?.name}</p>
        </div>
      ))}
    </div>
  )
}
```

## Best Practices Implemented

✅ **Type Safety**: Full TypeScript support with Sanity types
✅ **Performance**: 
  - CDN enabled for production
  - ISR (Incremental Static Regeneration) with 1-hour revalidation
  - API token stored securely in environment variables
✅ **Content Modeling**: 
  - Structured schemas with validation rules
  - Rich text content with portable text
  - Relationships (author, categories)
  - SEO fields for pages
✅ **API Routes**: 
  - Secure server-side data fetching
  - Error handling and logging
✅ **Scalability**: 
  - Modular schema types
  - Separate query definitions
  - Clean separation of concerns

## Next Steps

1. Create Sanity account at [sanity.io](https://sanity.io)
2. Add environment variables to `.env.local`
3. Run `pnpm install` to add dependencies
4. Start Sanity Studio with `sanity start`
5. Create your first content
6. Test API routes at `/api/posts` and `/api/pages`

## Sanity Studio

Access your Sanity Studio by running:
```bash
sanity start
```
Studio will be available at `http://localhost:3333`

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js Integration Guide](https://www.sanity.io/docs/next-js)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/portable-text)
