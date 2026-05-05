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
    "interrupts": *[_type == "feedInterrupt" && isActive == true] | order(insertAfter min) {
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
  const data = await sanityFetch({ query: DATA_QUERY, tags: ["resourceCard", "feedInterrupt"] });
  const posts = data?.posts || [];
  const interrupts = data?.interrupts || [];

  return <ResourcesLibrary initialPosts={posts} interrupts={interrupts} />;
}
