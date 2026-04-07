import {PortableTextBlock} from 'sanity'

export interface Author {
  _id: string
  name: string
  slug: {current: string}
  image?: {
    asset: {
      _id: string
      url: string
    }
  }
  bio?: string
}

export interface Category {
  _id: string
  title: string
  description?: string
}

export interface Post {
  _id: string
  title: string
  slug: {current: string}
  publishedAt: string
  mainImage?: {
    asset: {
      _id: string
      url: string
    }
    hotspot?: {
      x: number
      y: number
    }
  }
  author?: Author
  categories?: Category[]
  body: PortableTextBlock[]
}

export interface Page {
  _id: string
  title: string
  slug: {current: string}
  publishedAt: string
  content: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}
