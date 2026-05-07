import { sanityFetch } from "@/lib/sanity/client";
import ResourcesLibrary from "./ResourcesLibrary";

const DATA_QUERY = `
  {
    "posts": *[_type == "resourceCard"] | order(_createdAt desc) {
      _id, 
      title, 
      "tag": category, 
      "description": content, 
      _createdAt, 
      slug, 
      _type,
      "mainImageUrl": thumbnail.asset->url,
      "fileUrl": resourceFile.asset->url,
      "fileExtension": resourceFile.asset->extension
    },
    "blogPosts": *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "tag": "Article",
      "description": pt::text(body),
      "_createdAt": publishedAt,
      "slug": {"current": slug.current},
      _type,
      "mainImageUrl": mainImage.asset->url
    },
    "interrupts": *[_type == "feedInterrupt" && isActive == true] | order(insertAfter asc) {
      _id,
      interruptType,
      insertAfter,
      headline,
      subtext,
      ctaLabel,
      ctaUrl,
      accentColor,
      body,
      cardSize,
      tiles
    }
  }
`;

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const data = await sanityFetch({ query: DATA_QUERY, tags: ["resourceCard", "post", "feedInterrupt"] });
  const resourceCards = data?.posts || [];
  const blogPosts = data?.blogPosts || [];
  
  // Merge both content types into a single feed
  const allPosts = [...resourceCards, ...blogPosts].sort(
    (a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
  );
  
  const interrupts = data?.interrupts || [];

  return <ResourcesLibrary initialPosts={allPosts} interrupts={interrupts} />;
}
