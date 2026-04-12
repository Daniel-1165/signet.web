import { sanityFetch } from "@/lib/sanity/client";
import { GET_FEATURED_TESTIMONIALS, GET_TESTIMONIALS } from "@/lib/sanity/queries";
import { Testimonial } from "@/lib/sanity/types";
import TestimonialsClient from "./TestimonialsClient";

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    // Prefer featured testimonials; fall back to all if none are marked featured
    let data = await sanityFetch({
      query: GET_FEATURED_TESTIMONIALS,
      tags: ["testimonial"],
    });

    if (!data || data.length === 0) {
      data = await sanityFetch({
        query: GET_TESTIMONIALS,
        tags: ["testimonial"],
      });
    }

    return data ?? [];
  } catch (err) {
    console.error("Failed to load testimonials:", err);
    return [];
  }
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  return <TestimonialsClient testimonials={testimonials} />;
}
