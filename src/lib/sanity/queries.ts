// GROQ queries for Sanity content fetching

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

export const GET_TESTIMONIALS = `
  *[_type == "testimonial"] | order(featured desc, order asc, _createdAt desc) {
    _id,
    name,
    role,
    company,
    content,
    featured,
    order,
    avatar {
      asset-> {
        _id,
        url
      },
      hotspot,
    },
  }
`

export const GET_FEATURED_TESTIMONIALS = `
  *[_type == "testimonial" && featured == true] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    company,
    content,
    featured,
    order,
    avatar {
      asset-> {
        _id,
        url
      },
      hotspot,
    },
  }
`

export const GET_CERTIFICATES = `
  *[_type == "certificate"] | order(_createdAt desc) {
    _id,
    username,
    courseName,
    issueDate,
    certificateFile {
      asset-> {
        _id,
        url
      }
    }
  }
`

export const GET_ALL_RESOURCES = `
  *[_type == "resourceCard"] | order(_createdAt desc) {
    _id,
    title,
    category,
    thumbnail {
      asset-> {
        _id,
        url
      },
      hotspot,
    },
    resourceFile {
      asset-> {
        _id,
        url,
        extension
      }
    },
    content
  }
`

export const GET_ALL_POSTS = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{name, image},
    mainImage,
    categories[]->{title},
    publishedAt,
    body
  }
`

export const GET_POST_BY_SLUG = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{name, image},
    mainImage,
    categories[]->{title},
    publishedAt,
    body
  }
`
