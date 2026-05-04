import { sanityFetch } from "@/lib/sanity/client";
import ResourcesLibrary from "./ResourcesLibrary";

const POSTS_QUERY = `
  *[_type == "resourceCard"] | order(_createdAt desc) {
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
  }
`;

export const dynamic = "force-dynamic";

export default async function ResourcesPage() {
  const posts = (await sanityFetch({ query: POSTS_QUERY, tags: ["resourceCard"] })) || [];

  return <ResourcesLibrary initialPosts={posts} />;
}
