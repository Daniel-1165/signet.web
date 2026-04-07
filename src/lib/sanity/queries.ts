// GROQ queries for Sanity content fetching

export const GET_ALL_POSTS = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    author->,
    categories[]->,
    body,
  }
`

export const GET_POST_BY_SLUG = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    author->,
    categories[]->,
    body,
  }
`

export const GET_ALL_PAGES = `
  *[_type == "page"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    content,
    seoTitle,
    seoDescription,
  }
`

export const GET_PAGE_BY_SLUG = `
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    content,
    seoTitle,
    seoDescription,
  }
`

export const GET_AUTHORS = `
  *[_type == "author"] {
    _id,
    name,
    slug,
    image,
    bio,
  }
`

export const GET_CATEGORIES = `
  *[_type == "category"] {
    _id,
    title,
    description,
  }
`
